export interface IEntity {
  id: string;
  [key: string]: number | string | boolean | Array<number> | Array<string> | null | undefined;
}

export interface IProduct extends IEntity {
  title: string;
  description: string;
  price: number;
}

export interface IStock extends IEntity {
  product_id: string;
  count: number;
}

export interface IFullProduct extends IProduct {
  count: IStock['count'];
}