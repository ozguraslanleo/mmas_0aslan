const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const cognito = new AWS.CognitoIdentityServiceProvider();

exports.userAuth = async (event) => {
    const { userId, userPassword } = JSON.parse(event.body);

    try {
        // Check user credentials with DynamoDB
        const dbParams = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: { 'UserId': userId }
        };
        const dbResult = await dynamoDB.get(dbParams).promise();

        if (dbResult.Item && dbResult.Item.password === userPassword) {
            // User credentials are correct, initiate Cognito 2FA
            const cognitoParams = {
                AuthFlow: 'CUSTOM_AUTH',
                ClientId: process.env.COGNITO_CLIENT_ID,
                UserPoolId: process.env.COGNITO_USER_POOL_ID,
                AuthParameters: {
                    USERNAME: userId
                }
            };
            await cognito.initiateAuth(cognitoParams).promise();
            return { statusCode: 200, body: JSON.stringify({ message: '2FA initiated' }) };
        } else {
            // Credentials are incorrect
            return { statusCode: 401, body: JSON.stringify({ error: 'Invalid credentials' }) };
        }
    } catch (error) {
        console.error(error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
    }
};
