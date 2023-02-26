import { APIGatewayProxyResult } from 'aws-lambda';
import { corsHeaders } from '../constants';
import { products } from '../data/products';

export async function getProductsList(): Promise<APIGatewayProxyResult> {
  const statusCode = 200;
  const body = JSON.stringify(products);

  return { statusCode, body, headers: corsHeaders };
};
