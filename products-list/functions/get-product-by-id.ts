import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { handleError } from '../lib/common/error-handler';
import { fetchProductById } from '../lib/common/fetch-product-by-id';
import { headers } from '../lib/constants';

export async function getProductsById(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
  try {
    const product = await fetchProductById(event.pathParameters?.id as string);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(product),
    };
  } catch (e) {
    return handleError(e);
  }
};
