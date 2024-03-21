import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {
  SecretsManagerClient,
  ListSecretsCommand,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { PoolConnection, createPool } from 'mysql2/promise';
import { FileExtension, MimeType, fileTypeFromBuffer } from 'file-type';

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

function filterAndValidateMetadata(metadata: Metadata): Metadata {
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
  const contentType = event.headers['Content-Type'] || '';
  if (!event.body) throw new Error('Invalid form data: Missing body.');
  if (!contentType.startsWith('multipart/form-data'))
    throw new Error('Invalid content type: Expected multipart/form-data.');

  const buffer = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64')
    : Buffer.from(event.body, 'binary');
  const boundary = contentType?.split('boundary=')[1];
  if (!boundary) throw new Error('Missing boundary in content type.');

  const parts = buffer.toString()?.split(`--${boundary}`);
  const promises = parts.map((part) => processFormPart(part));
  const formData = await Promise.all(promises);
  return formData[1];
}

async function processFormPart(part: string): Promise<FormDataResult[]> {
  if (part.trim() === '--') return [];

  const [headerSection, dataSection] = part?.split('\r\n\r\n');
  if (!headerSection || !dataSection) return [];
  const headers = parsePartHeaders(headerSection);

  if (headers['content-disposition']?.includes('filename=')) {
    const formDataRes: FormDataResult = await processFilePart(
      headers,
      dataSection.trim(),
    );
    return [formDataRes];
  } else {
    const fieldName = extractFieldName(headers['content-disposition']);
    return [{ key: fieldName, value: dataSection.trim() }];
  }
}

function parsePartHeaders(headerSection: string): { [key: string]: string } {
  return headerSection?.split('\r\n').reduce((acc, line) => {
    const [key, value] = line?.split(': ');
    acc[key.toLowerCase()] = value?.trim();
    return acc;
  }, {});
}

async function processFilePart(
  headers: { [key: string]: string },
  dataSection: string,
): Promise<FileResult> {
  const contentDisposition = headers['content-disposition'];
  const fileName = contentDisposition.match(/filename="(.*)"/)[1];
  const fileBuffer = Buffer.from(dataSection, 'binary');
  let fileTypeResult = await fileTypeFromBuffer(fileBuffer);
  const fieldname = extractFieldName(contentDisposition);
  if (!fileTypeResult) {
    const mime = headers['content-type'] as MimeType;
    const ext = contentDisposition.match(/\.([^.]+)(?=")/)[1] as FileExtension;
    fileTypeResult = { mime, ext };
  }
  if (!fileTypeResult) throw new Error('Could not determine file type.');

  return {
    fieldname,
    fileName,
    extension: fileTypeResult.ext,
    mimetype: fileTypeResult.mime,
    processedImage: fileBuffer,
  };
}

function extractFieldName(contentDisposition: string): string {
  return contentDisposition.match(/name="(.*)"/)[1];
}

// Database operations
async function insertMetadata(
  {
    fileName,
    extension,
    ...eventBody
  }: { fileName: string; extension: string } & EventBody,
  client: PoolConnection,
): Promise<number> {
  let fields = ['photoname', 'photoext', ...Object.keys(eventBody)];
  let placeholders = fields.map(() => '?').join(', ');

  const metadata = filterAndValidateMetadata(eventBody);
  // Convert undefined values to null to ensure they are handled correctly in SQL
  let values = [
    fileName,
    extension,
    ...Object.values(metadata).map((value) =>
      value === undefined ? null : value,
    ),
  ];

  // Handle null values for pjobid and pwoid within the photoorder calculation
  const pjobid = eventBody.pjobid !== undefined ? eventBody.pjobid : null;
  const pwoid = eventBody.pwoid !== undefined ? eventBody.pwoid : null;

  // Step 1: Calculate Photo Order
  const photoOrderQuery = `
      SELECT COALESCE(MAX(photoorder), 0) + 1 AS nextPhotoOrder 
      FROM PQ_photos 
      WHERE pjobid IS NOT NULL AND pjobid = ? OR pwoid IS NOT NULL AND pwoid = ?
  `;
  const [orderResult] = await client.execute(photoOrderQuery, [pjobid, pwoid]);
  const photoOrder =
    typeof orderResult[0].nextPhotoOrder === 'number'
      ? orderResult[0].nextPhotoOrder
      : 1; // Extract calculated order

  fields = ['photoname', 'photoext', 'photoorder', ...Object.keys(eventBody)];
  placeholders = fields.map(() => '?').join(', ');
  values = [123456, extension, photoOrder, ...Object.values(metadata)];

  const insertQuery = `
      INSERT INTO PQ_photos (${fields.join(', ')})
      VALUES (${placeholders})
  `;
  const [ResultSetHeader] = (await client.execute(
    insertQuery,
    values,
  )) as unknown as InsertResult[];

  return ResultSetHeader.insertId;
}

async function deleteMetadata(
  photoId: number,
  client: PoolConnection,
): Promise<void> {
  await client.execute('DELETE FROM PQ_photos WHERE photoid = ?', [photoId]);
}

// S3 operations
async function uploadToS3(
  processedImage: Buffer,
  fileName: string,
  extension: string,
): Promise<void> {
  const putCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: `${fileName}.${extension}`,
    Body: processedImage,
    ContentType: `image/${extension}`,
  });
  await s3.send(putCommand);
}

// Process form fields
async function processFormData(
  formData: FormDataResult[],
  client: PoolConnection,
) {
  let additionalData: EventBody = {};

  for (const item of formData) {
    await processFileItem(item, client, additionalData);
  }
}

async function processFileItem(
  item: FormDataResult,
  client: PoolConnection,
  eventBody: EventBody,
) {
  // Check if the item is a file
  if ('processedImage' in item) {
    const { processedImage, fileName, extension } = item;
    try {
      // Insert metadata into the database
      const photoId = await insertMetadata(
        { fileName, extension, ...eventBody },
        client,
      );

      try {
        // Upload the image to S3
        await uploadToS3(processedImage, fileName, extension);
      } catch (s3Error) {
        // Attempt to delete database record if S3 upload fails
        await deleteMetadata(photoId, client);
        throw new S3Error(
          `Error uploading file ${fileName}.${extension} to S3. Database record rolled back. ${s3Error}`,
        );
      }
    } catch (metadataError) {
      console.error('Error inserting metadata into RDS:', metadataError);
      throw new DatabaseError(
        `Error inserting metadata for file ${fileName}.${extension} into the database. ${metadataError}`,
      );
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
