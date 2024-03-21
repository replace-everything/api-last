/**
 * Formats a value for SQL insertion, handling null, strings, and numbers.
 * Strings are safely quoted, and null values are converted to the SQL NULL.
 * @param value The value to format for SQL.
 * @returns The SQL-formatted value as a string.
 */
export function formatSqlValue(key: string, value: any): string {
  if (value === null) {
    return 'NULL';
  } else if (typeof value === 'string') {
    // Check if this is a field that requires date formatting
    if (key.endsWith('date') || key.endsWith('lastcontact')) {
      const date = new Date(value);
      const formattedDate = date.toISOString().slice(0, 19).replace('T', ' '); // Converts to "YYYY-MM-DD HH:MM:SS"
      return `'${formattedDate}'`;
    }
    return `'${value.replace(/'/g, "''")}'`;
  } else if (typeof value === 'number') {
    return value.toString();
  } else {
    throw new Error(`Unsupported data type for key ${key}: ${typeof value}`);
  }
}

/**
 * Constructs an INSERT statement for the given table and data.
 * @param schema The database schema name.
 * @param tableName The table name.
 * @param data The data to insert, as an object mapping column names to values.
 * @returns The constructed INSERT statement.
 */
export function buildInsertStatement<T>(
  schema: string,
  tableName: string,
  data: T,
): string {
  const columns = Object.keys(data)
    .map((column) => `\`${column}\``)
    .join(', ');
  const formattedValues = Object.values(data).map(formatSqlValue).join(', ');

  return `INSERT INTO ${schema}.${tableName} (${columns}) VALUES(${formattedValues}) RETURNING *;`;
}
