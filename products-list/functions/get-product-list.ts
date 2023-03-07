import { APIGatewayProxyResult } from 'aws-lambda';
import { docClient, headers, productsTableName } from '../lib/constants';

export async function getProductsList(): Promise<APIGatewayProxyResult> {
  const output = await docClient.scan({ TableName: productsTableName }).promise();
  const body = JSON.stringify(output.Items);

  return { statusCode: 200, headers, body };
};
