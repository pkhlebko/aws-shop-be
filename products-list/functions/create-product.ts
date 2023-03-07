import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as yup from 'yup';
import { v4 } from 'uuid';
import { docClient, headers, productsTableName } from '../lib/constants';
import { handleError } from '../lib/common/error-handler';

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
});

export async function createProduct(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const reqBody = JSON.parse(event.body as string);

    await schema.validate(reqBody, { abortEarly: false });

    const productID = v4();
    const product = { ...reqBody, productID };

    await docClient.put({ TableName: productsTableName, Item: product }).promise();

    return { statusCode: 201, headers: headers, body: JSON.stringify(product) };
  } catch (e) {
    return handleError(e);
  }
};

