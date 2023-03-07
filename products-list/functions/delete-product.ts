import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { handleError } from "../lib/common/error-handler";
import { fetchProductById } from "../lib/common/fetch-product-by-id";
import { docClient, productsTableName } from "../lib/constants";

export async function deleteProduct (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const id = event.pathParameters?.id as string;

    await fetchProductById(id);
    await docClient
      .delete({ TableName: productsTableName, Key: { productID: id } })
      .promise();

    return { statusCode: 204, body: "" };
  } catch (e) {
    return handleError(e);
  }
};