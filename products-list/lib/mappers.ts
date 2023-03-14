import { IFullProduct, IProduct, IStock } from "./interfaces";
import { v4 } from 'uuid';

export class Mappers {

  public static toProduct(input: Object): IProduct {
    const id: string =  input['id'];
    const title: string = input['title'];
    const description: string = input['description'];
    const price: number = +input['price'];

    return {id, title, description, price};
  }

  public static toStock(input: Object): IStock {
    const id: string =  input['id'];
    const product_id: string = input['product_id'];
    const count: number = +input['count'];

    return {id, product_id, count};
  }

  public static fullToProduct(fullProduct: IFullProduct): IProduct {
    const {id, title, description, price} = fullProduct;

    return {id, title, description, price};
  }

  public static fullToStock(fullProduct: IFullProduct): IStock {
    return {
      id: v4(),
      product_id: fullProduct.id,
      count: fullProduct.count
    };
  }

  public static productWithStockToFull(product: IProduct, stock: IStock | undefined = undefined): IFullProduct {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      count: stock?.count || 0
    };
  }

}
