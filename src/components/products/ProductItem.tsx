/** @format */

import { Product } from '@/pages';
import Image from 'next/image';
import React from 'react';

export type ProductItemProps = {
  product: Product;
  basketQty: number;
  onAdd: (id: number) => void;
  onReduce: (id: number) => void;
  onRemove: (id: number) => void;
};

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  basketQty,
  onAdd,
  onReduce,
  onRemove,
}) => {
  return (
    <div className='border p-4 rounded-md shadow-sm space-y-4'>
      <Image
        src={product.img}
        alt={product.name}
        fill={false}
        width={150}
        height={150}
        className='w-full h-100 object-cover rounded-md'
      />
      <p className='font-bold'>{product.name}</p>
      <p className='text-gray-500'>${product.price}</p>
      <div className='flex items-center space-x-4'>
        <p>
          Qty in bag: <span className='font-bold'>{basketQty}</span>
        </p>
        <button
          onClick={() => onAdd(product.id)}
          className='bg-green-500 text-white px-2 py-1 rounded'
        >
          +
        </button>
        <button
          onClick={() => onReduce(product.id)}
          className='bg-yellow-500 text-white px-2 py-1 rounded'
        >
          -
        </button>
        <button
          onClick={() => onRemove(product.id)}
          className='bg-red-500 text-white px-2 py-1 rounded'
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default React.memo(ProductItem);
