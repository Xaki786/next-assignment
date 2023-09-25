import { IndexedProducts, Product } from "./types";

export const getIndexedProducts = (products: Product[]): IndexedProducts =>
  products.reduce((acc: any, currentProduct) => {
    if (!acc[currentProduct.colour]) {
      return {
        ...acc,
        [currentProduct.id]: currentProduct,
      };
    }
    return acc;
  }, {});

export const transformProductsForFilters = (filterName: string) => {
  return (products: Record<string, any>[]) => {
    return products.reduce((acc: any, currentProduct) => {
      const isKeyPresent = filterName in currentProduct;
      if (isKeyPresent && !acc[currentProduct[filterName]]) {
        return {
          ...acc,
          [currentProduct[filterName]]: [currentProduct],
        };
      }
      return {
        ...acc,
        [currentProduct[filterName]]: [
          ...acc[currentProduct[filterName]],
          currentProduct,
        ],
      };
    }, {});
  };
};
