import * as AWS from 'aws-sdk';

export const docClient = new AWS.DynamoDB.DocumentClient();

export const productsTableName = 'ProductsTable';
export const stocksTableName = 'StocksTable';

export const headers = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};
