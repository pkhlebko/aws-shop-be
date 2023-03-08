import { APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const productsTableName = 'ProductsTable';
const headers = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

export const docClient = new DynamoDB.DocumentClient();

export async function getProductsList(): Promise<APIGatewayProxyResult> {
  const output = await docClient.scan({ TableName: productsTableName }).promise();
  const body = JSON.stringify(output.Items);

  return { statusCode: 200, headers, body };
};
