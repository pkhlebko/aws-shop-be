import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { IFullProduct, IProduct, IStock } from '../interfaces';
import { Mappers } from '../mappers';
import { productsTableName, stocksTableName } from '../constants';
import * as AWS from 'aws-sdk';
import * as uuid from 'uuid'

export class ProductService {
  private docClient: DocumentClient;

  constructor() {
    this.docClient = new AWS.DynamoDB.DocumentClient();
  }

  public async getFullProducts(): Promise<IFullProduct[]> {
    const products: IProduct[] | undefined = await this.docClient.scan({ TableName: productsTableName }).promise()
      .then(({ Items }) => Array.isArray(Items) ? Items.map(Mappers.toProduct) : undefined) || [];
    const stocks: IStock[] | undefined = await this.docClient.scan({ TableName: stocksTableName }).promise()
      .then(({ Items }) => Array.isArray(Items) ? Items.map(Mappers.toStock) : undefined) || [];

    return products.map((product) => Mappers.productWithStockToFull(product, stocks.find(({ product_id }) => product_id === product.id)));
  }

  public async getProductById(id: string): Promise<IFullProduct | undefined> {
    const product: IProduct | undefined = await this.docClient.get({ TableName: productsTableName, Key: { id } }).promise()
      .then(({ Item }) => Item ? Mappers.toProduct(Item) : undefined);
    const stock: IStock | undefined = await this.docClient.get({ TableName: stocksTableName, Key: { product_id: id } }).promise()
      .then(({ Item }) => Item ? Mappers.toStock(Item) : undefined);
    const count = stock?.count || 0;

    return product ? { ...product, count } : undefined;
  };

  public async createProduct(fullProduct: Omit<IFullProduct, 'id'>): Promise<IFullProduct> {
    const id = uuid.v4();
    const product = Mappers.fullToProduct(fullProduct as IFullProduct);
    const stock = Mappers.fullToStock(fullProduct as IFullProduct);

    await this.docClient.transactWrite({
      TransactItems: [
        { Put: { TableName: productsTableName, Item: { ...product, id } } },
        { Put: { TableName: stocksTableName, Item: { ...stock, product_id: id } } }
      ],
    }).promise();

    return Mappers.productWithStockToFull(product, stock);
  }
}
