import { docClient, productsTableName } from "../constants";
import { HttpError } from "./error-handler";

export const fetchProductById = async (id: string) => {
  const output = await docClient
    .get({ TableName: productsTableName, Key: { productID: id } })
    .promise();

  if (!output.Item) {
    throw new HttpError(404, { error: "not found" });
  }

  return output.Item;
};