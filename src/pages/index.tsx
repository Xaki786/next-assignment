/** @format */

import { useCallback, useState } from "react";
import { fetchProducts } from "@services/products";
import Layout from "@components/layout/Layout";
import Filter from "@components/filter/Filter";
import ProductItem from "@components/products/ProductItem";
import Basket from "@components/basket/Basket";
import {
  TransformedProductsForFilters,
  IndexedProducts,
  Product,
} from "@common/types";
import { useProducts } from "@hooks/useProducts";
import { getIndexedProducts, transformProductsForFilters } from "@common/utils";

type HomeProps = {
  products: Product[];
  transformedProductsForColourFilters: TransformedProductsForFilters;
  possibleFilterValues: string[];
  indexedProducts: IndexedProducts;
};

export default function Home({
  products,
  transformedProductsForColourFilters,
  possibleFilterValues,
  indexedProducts,
}: HomeProps) {
  const {
    basket,
    handleIncreaseQuantity,
    handleReduceQuantity,
    handleRemoveFromBasket,
  } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleChangeFilter = useCallback(
    (filter: string) => {
      setSelectedFilter(filter);
      if (filter) {
        setFilteredProducts(transformedProductsForColourFilters[filter]);
      } else {
        const products = Object.values(indexedProducts) ?? [];
        setFilteredProducts(products);
      }
    },
    [transformedProductsForColourFilters, indexedProducts],
  );

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-1 mt-4">
          <Basket indexedProducts={indexedProducts} basket={basket} />
          <div className="mt-4">
            <Filter
              filterValues={possibleFilterValues}
              selectedFilter={selectedFilter}
              onFilter={handleChangeFilter}
            />
          </div>
        </div>
        <div className="col-span-2 mt-8 sm:mt-0">
          {filteredProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              basketQty={basket.get(product.id) || 0}
              onAdd={handleIncreaseQuantity}
              onReduce={handleReduceQuantity}
              onRemove={handleRemoveFromBasket}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  try {
    const products = await fetchProducts();
    const transformByColours = transformProductsForFilters("colour");
    const transformedProductsForColourFilters = transformByColours(products);
    const indexedProducts = getIndexedProducts(products);

    const possibleFilterValues =
      Object.keys(transformedProductsForColourFilters) ?? [];

    return {
      props: {
        products,
        transformedProductsForColourFilters,
        possibleFilterValues,
        indexedProducts,
      },
      revalidate: 10,
    };
  } catch (error) {
    return { props: { products: [] }, revalidate: 10 };
  }
};
