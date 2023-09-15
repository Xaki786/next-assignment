/** @format */

import React from 'react';
import { Product } from '../../pages';
import Image from 'next/image';

type ProductItemProps = {
  product: Product;
  basketQty: number;
  onRemove: (id: number) => void;
  onAdd: (productId: number) => void;
  onReduce: (productId: number) => void;
};

const ProductItem2: React.FC<ProductItemProps> = ({
  product,
  basketQty,
  onAdd,
  onReduce,
  onRemove,
}) => {
  return (
    <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 p-4 border-b min-w-64'>
      <div className='flex justify-center items-center w-full sm:w-1/4'>
        <Image
          src={product.img}
          alt={product.name}
          fill={false}
          width={175}
          height={50}
          className='object-contain rounded-md'
        />
      </div>

      <div className='w-full sm:w-1/2'>
        <div className='space-y-2'>
          <p className='font-bold'>{product.name}</p>
          <p className='text-gray-600'>${product.price.toFixed(2)}</p>
        </div>
      </div>

      <div className='w-2/3 mx-auto sm:w-1/6'>
        <div className='space-x-2 flex justify-between items-center'>
          <button
            onClick={() => onReduce(product.id)}
            className='bg-red-500 text-white p-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
          >
            -
          </button>
          <span>{basketQty}</span>
          <button
            onClick={() => onAdd(product.id)}
            className='bg-green-500 text-white p-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
          >
            +
          </button>
        </div>
        <div className='mt-4 w-full'>
          <button
            onClick={() => onRemove(product.id)}
            className='bg-red-500 text-white px-2 py-1 rounded w-full'
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem2;
