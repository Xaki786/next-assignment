export type Product = {
  id: number;
  name: string;
  price: number;
  img: string;
  colour: string;
};
export type Basket = Map<number, number>;

export type TransformedProductsForFilters = {
  [key: string]: Product[];
};

export type IndexedProducts = {
  [key: string]: Product;
};
