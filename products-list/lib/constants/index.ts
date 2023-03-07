import { DynamoDB } from 'aws-sdk';

export const productsTableName = 'ProductsTable';
export const stocksTableName = 'StocksTable';

export const headers = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

export const docClient = new DynamoDB.DocumentClient();