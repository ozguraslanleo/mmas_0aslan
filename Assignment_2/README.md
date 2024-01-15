
# MMAS User Authentication

## Description
This Serverless project sets up a user authentication system using AWS Lambda, Amazon Cognito, DynamoDB, and SNS for 2FA (Two-Factor Authentication). The system is designed to handle user login requests  wit 2FA.

## Prerequisites
You should have met the following requirements:
- AWS Account and user credentials.
    ### Windows
    set AWS_ACCESS_KEY_ID=your_access_key_id
    set AWS_SECRET_ACCESS_KEY=your_secret_access_key
    set AWS_DEFAULT_REGION=your_default_region

    ### Linux
    export AWS_ACCESS_KEY_ID=your_access_key_id
    export AWS_SECRET_ACCESS_KEY=your_secret_access_key
    export AWS_DEFAULT_REGION=your_default_region
- Node.js and NPM installed.
- Serverless Framework installed.

## nstallation & Deployment
To deploy this project, follow these steps:

### Clone the repository
git clone [repository_url]
### Install dependencies
npm install
### Deploy the Serverless application
serverless deploy