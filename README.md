# Project Name: RAES API

## 1. Project Overview

[Provide a brief description of what your project does and its purpose. Mention that it's built using NestJS, TypeORM, TypeScript, and is configured for Serverless deployment.]

## 2. Prerequisites

- Node.js (version [specify version])
- Yarn package manager
- AWS CLI, configured with appropriate AWS credentials
- Serverless framework
- [Any other global dependencies]

## 3. Setting Up the Development Environment

### Environment Variables

Copy the `.env.example` file to create a `.env` file in your root directory. Fill in the environment variables as per your configuration:

```env
NODE_ENV=local
CORS_ORIGIN=[Your CORS origins]
DB_CREDENTIALS_ARN=[Your AWS ARN credentials]

# Database Configuration
username=[Database Username]
password=[Database Password]
engine=[Database Engine]
host=[Database Host]
port=[Database Port]
dbInstanceIdentifier=[DB Instance Identifier]
schema=[Database Schema]
```

### Installing Dependencies

Run the following command to install project dependencies:

```bash
yarn install
```

Run the same command in api-testing-ui if you plan to use that:

```bash
cd api-testing-ui
yarn install
```

## 4. Running the Application Locally

To start the application in development mode, run:

```bash
yarn deploy:offline
```

This command will start the serverless API on port 3000. Change to the api-testing-ui folder & run the following command to start the very basic React UI for testing routes. Notably, the routes present there are not dynamically generated, but are a hardcoded array of endpoints in App.tsx.

```bash
cd api-testing-ui
yarn start
```

## 5. Running Tests

Execute the test suite using:

```bash
yarn test
```

For coverage reports, use:

```bash
yarn test:cov
```

## 6. Deployment

Deploy your application to the desired stage (dev, stage, prod) using the script, which will format, lint, then deploy the app's serverless.yml to Serverless:

```bash
yarn deploy:stage \[stagename\]
```

Create a build for deploying to AWS Lambda using Serverless, use:

```bash
yarn build:deploy
```

### Interactive Deployment Script

Run the interactive deployment script with:

```bash
yarn aw:yeah:dude
```

This script guides you through various deployment steps like bundling, building AWS Lambda layers, and deploying to AWS.

## 7. Additional Scripts and Commands

- `build:dev`: Build the application in development mode.
- `build:lambda`: Build specific Lambda functions.
- `deploy:offline`: Run serverless offline for local testing.
- `format`: Format code using Prettier.
- `lint`: Lint your code using ESLint.
- [Add any other scripts from `package.json` that users should know about.]

## 8. Contributing to the Project

[Instructions on how users can contribute to the project. Include steps to fork, create pull requests, and the coding standards or guidelines they should follow.]

## 9. License

This project is licensed under the MIT License.
