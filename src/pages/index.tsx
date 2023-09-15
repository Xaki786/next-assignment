/** @format */

import { useState } from 'react';
import { fetchProducts } from '@services/products';
/** @format */

import Layout from '@components/layout/Layout';
import Filter from '@components/filter/Filter';
import ProductItem, {
  ProductItemProps,
} from '@components/products/ProductItem';
import Basket from '@/components/basket/Basket';
import ProductItem4 from '@/components/products/ProductItem4';

export type Product = {
  id: number;
  name: string;
  price: number;
  img: string;
  colour: string;
};
export type Basket = {
  [productId: string]: number;
};
export default function Home({ products }: { products: Product[] }) {
  console.log('first');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [basket, setBasket] = useState<Basket>({});
  const [selectedColour, setSelectedColour] = useState('');
  const handleFilter = (colour: string) => {
    setSelectedColour(colour);
    if (colour) {
      setFilteredProducts(
        products.filter((product) => product.colour === colour)
      );
    } else {
      setFilteredProducts(products);
    }
  };

  const handleAddToCart = (productId: number) => {
    setBasket((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const handleReduceQuantity = (productId: number) => {
    setBasket((prev) => {
      if (prev[productId] > 1) {
        return {
          ...prev,
          [productId]: prev[productId] - 1,
        };
      } else {
        const updatedBasket = { ...prev };
        delete updatedBasket[productId];
        return updatedBasket;
      }
    });
  };

  const handleRemoveFromBasket = (productId: number) => {
    setBasket((prev) => {
      const updatedBasket = { ...prev };
      delete updatedBasket[productId];
      return updatedBasket;
    });
  };
  return (
    <Layout>
      <div className='container mx-auto px-4 py-6 w-full bg-slate-200'>
        <div className='grid grid-cols-1 md:grid-cols-3'>
          <div className='col-span-1 mt-4'>
            <Basket products={products} basket={basket} />
            <div className='mt-4'>
              <Filter selectedColour={selectedColour} onFilter={handleFilter} />
            </div>
          </div>
          <div className='col-span-2'>
            {filteredProducts.map((product) => (
              <ProductItem4
                key={product.id}
                product={product}
                basketQty={basket[product.id] || 0}
                onAdd={handleAddToCart}
                onReduce={handleReduceQuantity}
                onRemove={handleRemoveFromBasket}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  try {
    const products = await fetchProducts();
    return { props: { products }, revalidate: 10 };
  } catch (error) {
    return { props: { products: [] }, revalidate: 10 };
  }
};
