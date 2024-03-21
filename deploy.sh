#!/bin/bash

# Check if stage/NODE_ENV is provided as an argument
if [ -z "$1" ]; then
  echo "Please provide the stage/NODE_ENV as an argument."
  exit 1
fi

stage=$1

# Load environment variables from .env.${stage} file
if [ -f ".env.${stage}" ]; then
  source ".env.${stage}"
else
  echo "Environment file .env.${stage} not found."
  exit 1
fi

# Retrieve the DbCredentialArn from the environment variable
db_credential_arn=${DB_CREDENTIALS_ARN}

# Build the Docker image
docker build -t raes:${stage} .

# Retrieve the AWS account ID and region
aws_account_id=712114882498
aws_region='us-east-1'

# Tag the Docker image with the ECR repository URI
docker tag raes:${stage} ${aws_account_id}.dkr.ecr.${aws_region}.amazonaws.com/raes:${stage}

# Push the Docker image to ECR
aws ecr get-login-password --region ${aws_region} | docker login --username AWS --password-stdin ${aws_account_id}.dkr.ecr.${aws_region}.amazonaws.com
docker push ${aws_account_id}.dkr.ecr.${aws_region}.amazonaws.com/raes:${stage}

# Deploy the CloudFormation stack
stack_name="NestFastifyAppStack-${stage}"
app_image_uri=${aws_account_id}.dkr.ecr.${aws_region}.amazonaws.com/raes:${stage}
echo "app_image_uri: ${app_image_uri}"
aws cloudformation deploy --stack-name ${stack_name} --template-file cloudformation.yml --capabilities CAPABILITY_IAM --parameter-overrides DbCredentialArn=${db_credential_arn} AppImageUri="${app_image_uri}"

# Retrieve the API Gateway endpoint from the stack output
api_gateway_endpoint=$(aws cloudformation describe-stacks --stack-name ${stack_name} --query 'Stacks[0].Outputs[?OutputKey==`APIGatewayEndpoint`].OutputValue' --output text)

echo "Deployment completed successfully!"
echo "API Gateway Endpoint: ${api_gateway_endpoint}"