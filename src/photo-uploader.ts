import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {
  SecretsManagerClient,
  ListSecretsCommand,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { PoolConnection, createPool } from 'mysql2/promise';

// Initialize AWS S3
const s3 = new S3Client({ region: 'us-east-1' });
const bucketName = process.env.BUCKET_NAME;

const secretsManager = new SecretsManagerClient({ region: 'us-east-1' });
let dbCredentials: any;

// Fetch database credentials from AWS Secrets Manager
async function getDbCredentials() {
  if (!dbCredentials) {
    const partialArn = process.env.DB_CREDENTIALS_ARN;
    const listSecretsResponse = await secretsManager.send(
      new ListSecretsCommand({}),
    );
    const secret = listSecretsResponse.SecretList?.find((s) =>
      s.ARN?.includes(partialArn),
    );
    if (secret?.ARN) {
      const secretValueResponse = await secretsManager.send(
        new GetSecretValueCommand({
          SecretId:
            'arn:aws:secretsmanager:us-east-1:712114882498:secret:raes-db-dev-6U40ox',
        }),
      );
      dbCredentials = JSON.parse(secretValueResponse.SecretString || '{}');
    } else {
      console.error(
        'No matching secret found for the provided partial ARN:',
        partialArn,
      );
      throw new Error('SecretNotFound');
    }
  }
  return dbCredentials;
}

interface EventBody {
  pjobid?: number;
  pwoid?: number;
  pwotype?: string;
  photonotes?: string;
  phototags?: string;
}

interface FileResult {
  processedImage: Buffer;
  fileName: string;
  extension: string;
  mimetype: string;
  fieldname: string;
}

interface LambdaEvent {
  headers: { [key: string]: string };
  body: string;
  httpMethod: string;
  isBase64Encoded: boolean;
  multiValueHeaders: Record<string, string[]>;
  multiValueQueryStringParameters: Record<string, string[]> | null;
  path: string;
  pathParameters: Record<string, string> | null;
  queryStringParameters: Record<string, string> | null;
  requestContext: {
    accountId: string;
    apiId: string;
    authorizer?: {
      // Assuming optional here
      claims?: any;
      principalId?: string;
      scopes?: string[];
    };
    domainName: string;
    domainPrefix: string;
    extendedRequestId: string;
    httpMethod: string;
    identity: {
      accessKey: string | null;
      accountId: string;
      apiKey: string;
      apiKeyId: string;
      caller: string;
      cognitoAuthenticationProvider: string;
      cognitoAuthenticationType: string;
      cognitoIdentityId: string;
      cognitoIdentityPoolId: string;
      principalOrgId: string | null;
      sourceIp: string;
      user: string;
      userAgent: string;
      userArn: string;
    };
    operationName?: string;
    path: string;
    protocol: string;
    requestId: string;
    requestTime: string;
    requestTimeEpoch: number;
    resourceId: string;
    resourcePath: string;
    stage: string;
  };
  resource: string;
  stageVariables: Record<string, string> | null;
}

interface FieldResult {
  key: string;
  value: string;
}

type FormDataResult = FileResult | FieldResult;

interface InsertResult {
  fieldCount: number;
  affectedRows: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
  changedRows: number;
  insertId: number;
}

interface Metadata {
  [key: string]: string | number;
}

function filterAndValidateMetadata(metadata: EventBody): Metadata {
  const allowedKeys = [
    'pjobid',
    'pwoid',
    'pwotype',
    'puser',
    'photoname',
    'photoext',
    'photodts',
    'photolabel',
    'phototags',
    'photoorder',
    'photoidcc',
    'photodtscc',
    'photoreq',
    'photonotes',
  ];

  const filteredMetadata: Metadata = Object.keys(metadata)
    .filter((key) => allowedKeys.includes(key))
    .reduce((obj: Metadata, key) => {
      obj[key] = metadata[key];
      return obj;
    }, {});

  return filteredMetadata;
}

// Create a database connection pool
async function createDbPool() {
  const credentials = await getDbCredentials();
  return createPool({
    host: 'raes-db-dev.c9igrwgeoj2u.us-east-1.rds.amazonaws.com',
    port: parseInt(credentials.port || '3306', 10),
    user: credentials.username,
    password: credentials.password,
    database: credentials.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

// Parse multipart/form-data
async function parseFormData(event: LambdaEvent): Promise<FormDataResult[]> {
  const contentType =
    event.headers['Content-Type'] || event.headers['content-type'] || '';
  if (!event.body) throw new Error('Invalid form data: Missing body.');
  if (!contentType.startsWith('multipart/form-data'))
    throw new Error('Invalid content type: Expected multipart/form-data.');

  const buffer = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64')
    : Buffer.from(event.body, 'binary');
  if (!buffer) throw new Error('Invalid form data: Missing buffer.');
  const boundary = contentType?.split('boundary=')[1];
  if (!boundary) throw new Error('Missing boundary in content type.');

  const bufferString = buffer.toString();
  const boundaryString = `\r\n--${boundary}\r\n`;
  let parts = bufferString.split(boundaryString);

  // Initialize formDataAccumulator to store fileName and mimeType
  let formDataAccumulator = { fileName: undefined, mimeType: undefined };

  // Update the map function to pass formDataAccumulator to processFormPart
  const promises = parts.map((part) =>
    processFormPart(part, formDataAccumulator),
  );
  const formData = (await Promise.all(promises)).flat();

  return formData;
}

async function processFormPart(
  part: string,
  formDataAccumulator: { fileName?: string; mimeType?: string },
): Promise<FormDataResult[]> {
  const trimmedPart = part.trim();
  if (trimmedPart === '--') return [];

  const [headerSection, dataSection] = trimmedPart.split('\r\n\r\n', 2);
  if (!headerSection || !dataSection) return [];

  const headers = parsePartHeaders(headerSection);
  const contentDisposition = headers['content-disposition'];

  // Extract filename from the part with 'body[name]'
  if (contentDisposition && contentDisposition.includes('name="body[name]"')) {
    formDataAccumulator.fileName = dataSection.trim();
  }

  // Extract MIME type from the part with 'body[type]'
  if (contentDisposition && contentDisposition.includes('name="body[type]"')) {
    formDataAccumulator.mimeType = dataSection.trim();
  }

  // Check if this part is the file data part based on the 'name' attribute in the 'content-disposition' header
  if (contentDisposition && contentDisposition.includes('name="body[data]"')) {
    const base64Data = dataSection.trim();
    const base64Content = base64Data.startsWith('data:')
      ? base64Data.split(',')[1]
      : base64Data;
    const fileBuffer = Buffer.from(base64Content, 'base64');

    // Use the accumulated filename and MIME type
    const fileName = formDataAccumulator.fileName || 'default_filename';
    const mimeType = formDataAccumulator.mimeType || 'application/octet-stream';
    const extension = mimeType.split('/')[1] || 'bin'; // Simple extraction of extension from MIME type

    return [
      {
        processedImage: fileBuffer,
        fileName: fileName,
        extension: extension,
        mimetype: mimeType,
        fieldname: 'file',
      },
    ];
  }

  // For other form parts, return key-value pairs
  const fieldName = extractFieldName(contentDisposition, dataSection);
  return [{ key: fieldName, value: dataSection.trim() }];
}

function parsePartHeaders(headerSection: string): { [key: string]: string } {
  return headerSection?.split('\r\n').reduce((acc, line) => {
    const [key, value] = line?.split(': ');
    acc[key.toLowerCase()] = value?.trim();
    return acc;
  }, {});
}

function extractFieldName(
  contentDisposition: string,
  dataSection: string,
): string {
  let fileName: string;
  if (contentDisposition.match(/name="(.*)"/)?.length) {
    fileName = contentDisposition.match(/name="(.*)"/)[1];
  } else if (dataSection.match(/name="(.*)"/)?.length) {
    fileName = dataSection.match(/name="(.*)"/)[1];
  }
  return fileName;
}

// Database operations
async function insertMetadata(
  {
    fileName,
    extension,
    eventBody,
  }: { fileName: string; extension: string; eventBody: EventBody },
  client: PoolConnection,
): Promise<number> {
  // Filter and validate metadata to include only allowed keys and values that are not undefined
  const metadata = filterAndValidateMetadata(eventBody);
  if (metadata?.photoname && `${metadata.photoname}`.length > 6)
    metadata.photoname = ('' + metadata.photoname).substring(0, 6);

  let fields = ['photoname', 'photoext'];
  let placeholders = ['?', '?'];
  let values = [fileName, extension];

  // Add additional data fields, placeholders, and values dynamically
  for (const [key, value] of Object.entries(metadata)) {
    if (value !== undefined) {
      fields.push(key);
      placeholders.push('?');
      values.push(typeof value === 'number' ? `'${value}'` : value);
    }
  }

  // Calculate photo order
  let photoOrder = 1; // Default photo order
  try {
    const photoOrderQuery = `
      SELECT COALESCE(MAX(photoorder), 0) + 1 AS nextPhotoOrder 
      FROM PQ_photos 
      WHERE (pjobid IS NOT NULL AND pjobid = ?) OR (pwoid IS NOT NULL AND pwoid = ?)
    `;
    const [orderResult] = await client.execute(photoOrderQuery, [
      metadata.pjobid || null,
      metadata.pwoid || null,
    ]);
    photoOrder = orderResult[0]?.nextPhotoOrder || 1;
  } catch (e) {
    console.error('Error calculating photo order:', e);
  }

  // Add photo order to the SQL query
  fields.push('photoorder');
  placeholders.push('?');
  values.push(`${photoOrder}`);

  // Construct the final SQL query
  const insertQuery = `INSERT INTO PQ_photos (${fields.map((key) => `\`${key}\``).join(', ')}) VALUES (${values.map((value) => `'${value}'`).join(', ')}) RETURNING *;`;

  try {
    const [ResultSetHeader] = (await client.execute(
      insertQuery,
    )) as unknown as InsertResult[];
    return ResultSetHeader.insertId;
  } catch (e) {
    console.error('Error inserting metadata into RDS:', e);
    throw new DatabaseError(
      `Error inserting metadata for file ${fileName}.${extension} into the database. ${e}`,
    );
  }
}

async function deleteMetadata(
  photoId: number,
  client: PoolConnection,
): Promise<void> {
  await client.execute('DELETE FROM PQ_photos WHERE photoid = ?', [photoId]);
}

// S3 operations
async function uploadToS3(fileBuffer, fileName, mimeType) {
  const s3Key = `${fileName}`;

  const putCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: s3Key,
    Body: fileBuffer,
    ContentType: mimeType,
  });

  await s3.send(putCommand);
}

// Process form fields
async function processFormData(formData, client) {
  let additionalData = {};

  for (const item of formData) {
    if ('processedImage' in item) {
      // File data is available
      const { processedImage, fileName, mimetype } = item;
      const extension = mimetype.split('/')[1];

      let photoId: any;
      try {
        // Insert metadata into the database (adjust insertMetadata to accept additionalData)
        photoId = await insertMetadata(
          { fileName, extension, eventBody: additionalData },
          client,
        );
      } catch (e) {
        console.error('Error inserting metadata into RDS:', e);
      }
      try {
        // Upload file to S3
        await uploadToS3(processedImage, fileName, mimetype);
      } catch (s3Error) {
        // Attempt to delete database record if S3 upload fails
        await deleteMetadata(photoId, client);
        throw new S3Error(
          `Error uploading file ${fileName}.${extension} to S3. Database record rolled back. ${s3Error}`,
        );
      }
    } else {
      // Handle additional form data for database insertion
      additionalData[item.key] = item.value;
    }
  }
}

// Main handler
export const handler = async (event: LambdaEvent) => {
  const dbPool = await createDbPool();
  // Establish a database connection
  let client: PoolConnection;
  try {
    client = await dbPool.getConnection();
  } catch (dbError) {
    console.error('Error connecting to the database:', dbError);
    throw new DatabaseError(
      `Error establishing a connection with the database. ${dbError}`,
    );
  }

  let formData: FormDataResult[];

  // Attempt to parse the form data
  try {
    formData = await parseFormData(event);
  } catch (parseError) {
    console.error('Error parsing form data:', parseError);
    throw new ParseError(
      `Error parsing form data. Ensure the request is correctly formatted. ${parseError}`,
    );
  }

  try {
    await processFormData(formData, client);
  } catch (e) {
    console.error('Error processing form data:', e);
    throw new ProcessFormDataError(`Error processing form data. ${e}`);
  }

  // Release the database connection
  client.release();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Files processed successfully' }),
  };
};

// Custom error classes
class ParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ParseError';
  }
}

class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

class S3Error extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'S3Error';
  }
}

class ProcessFormDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'processFormDataError';
  }
}
