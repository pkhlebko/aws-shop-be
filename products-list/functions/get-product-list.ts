import { APIGatewayProxyResult } from 'aws-lambda';
import { ProductService } from '../lib/services/products.service';
import { headers } from '../lib/constants';

export async function getProductsList(): Promise<APIGatewayProxyResult> {
  const productService = new ProductService();
  const products = await productService.getFullProducts();
  const body = JSON.stringify(products);

  return { statusCode: 200, headers, body };
};
