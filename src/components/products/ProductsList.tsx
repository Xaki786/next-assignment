/** @format */

import { Basket, Product } from '@/pages';
import ProductItem from './ProductItem';

type ProductListProps = {
  products: Product[];
  basket: Basket;
  onAdd: (id: number) => void;
  onReduce: (id: number) => void;
  onRemove: (id: number) => void;
};
const ProductList: React.FC<ProductListProps> = ({
  products,
  basket,
  onAdd,
  onReduce,
  onRemove,
}) => {
  return (
    <div className='space-y-4'>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          basketQty={basket[product.id] || 0}
          onAdd={onAdd}
          onReduce={onReduce}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default ProductList;
