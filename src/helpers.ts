import { ConfigService } from '@nestjs/config';

export function setDatabaseConfig(configService: ConfigService<any, any>) {
  try {
    // Check for missing DB environment variables
    if (
      !process.env?.host ||
      !process.env?.name ||
      !process.env?.username ||
      !process.env?.password ||
      !process.env?.engine ||
      !process.env?.schema
    ) {
      throw new Error(`The database environment variables are not set`);
    }

    // Construct the names of the required DB environment variables
    const requiredDBEnvVars = [
      'username',
      'schema',
      'engine',
      'password',
      'host',
    ];

    requiredDBEnvVars.forEach((dbVarName) => {
      const varValue = configService.get<string>(dbVarName);
      if (!varValue) {
        throw new Error(`Environment databse variables are not set`);
      }
    });
    return { requiredDBEnvVars };
  } catch (error) {
    console.error(error.message);
    // Handle the error gracefully as needed
    // For example, you can return null or a default value
    return null;
  }
}
