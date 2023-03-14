import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { handleError } from '../lib/common/error-handler';
import { headers } from '../lib/constants';
import * as yup from 'yup';
import { ProductService } from '../lib/services/products.service';

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  count: yup.number().required(),
});

export async function createProduct(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const productService = new ProductService();

  try {
    const reqBody = JSON.parse(event.body as string);

    await schema.validate(reqBody, { abortEarly: false });

    const fullProduct = await productService.createProduct(reqBody);

    return { statusCode: 201, headers: headers, body: JSON.stringify(fullProduct) };
  } catch (e) {
    return handleError(e);
  }
};

