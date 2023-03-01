import { products } from '../data/products';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { corsHeaders } from '../constants';

const productNotFound = { statusCode: 404, body: 'Product not found', headers: corsHeaders };
const returnProduct = (product: Object) => ({ statusCode: 200, body: JSON.stringify(product), headers: corsHeaders });

export async function getProductsById (event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
  const productId = event.pathParameters?.productId;
  const product = productId && products.find((item) => item.id === +productId);

  return product ? returnProduct(product) : productNotFound;
};
