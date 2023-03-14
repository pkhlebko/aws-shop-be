import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { handleError } from '../lib/common/error-handler';
import { headers } from '../lib/constants';
import { ProductService } from '../lib/services/products.service';

export async function getProductsById(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
  const productService = new ProductService();

  try {
    const id: string|undefined = event.pathParameters?.id;

    if (!id) {
      return { statusCode: 404, headers, body: `ID not found. \n ${JSON.stringify(event)}` };
    }

    const product = await productService.getProductById(event.pathParameters?.id as string);

    return { statusCode: 200, headers, body: JSON.stringify(product) };
  } catch (e) {
    return handleError(e);
  }
};
