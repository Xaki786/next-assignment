/** @format */

import Image from 'next/image';
import { Product, Basket as BasketType } from '../../pages'; // Assuming you have these types defined

type BasketProps = {
  products: Product[];
  basket: BasketType;
};

const Basket: React.FC<BasketProps> = ({ products, basket }) => {
  const getTotal = () => {
    return Object.keys(basket).reduce((acc, productId) => {
      const product = products.find((p) => p.id.toString() === productId);
      if (product) {
        return acc + product.price * basket[productId];
      }
      return acc;
    }, 0);
  };

  return (
    <div className='border p-4 rounded-md shadow-sm space-y-4 bg-white'>
      <h2 className='text-xl font-bold border-b pb-2'>Your Basket</h2>
      <ul className='space-y-2'>
        {Object.keys(basket).map((productId) => {
          const product = products.find((p) => p.id.toString() === productId);
          return product ? (
            <li
              key={productId}
              className='flex justify-between items-center border-b pb-2 pt-2'
            >
              <div className='flex items-center space-x-2'>
                <Image
                  src={product.img}
                  alt={product.name}
                  width={60}
                  height={60}
                  className='w-16 object-cover rounded-md mr-4'
                />
                <span>
                  {product.name} (x{basket[productId]})
                </span>
              </div>
              <span className='font-bold ml-4'>
                ${(product.price * basket[productId]).toFixed(2)}
              </span>
            </li>
          ) : null;
        })}
      </ul>
      <div className='flex justify-between font-bold mt-4'>
        <span>Total:</span>
        <span>${getTotal().toFixed(2)}</span>
      </div>
      {/* <button className='w-full mt-4 bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'>
        Proceed to Checkout
      </button> */}
    </div>
  );
};

export default Basket;
