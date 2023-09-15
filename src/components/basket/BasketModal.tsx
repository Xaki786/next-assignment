/** @format */

import { Product, Basket as BasketType } from '../../pages';

type BasketModalProps = {
  products: Product[];
  basket: BasketType;
  onClose: () => void;
};

const BasketModal: React.FC<BasketModalProps> = ({
  products,
  basket,
  onClose,
}) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
      <div className='bg-white p-8 rounded shadow-lg max-w-2xl max-h-3/4 overflow-y-auto'>
        <h2 className='text-xl font-bold mb-4'>Your Basket</h2>
        <ul className='space-y-4'>
          {Object.keys(basket).map((productId) => {
            const product = products.find((p) => p.id.toString() === productId);
            return product ? (
              <li
                key={productId}
                className='flex justify-between items-center border-b pb-2 pt-2'
              >
                <div className='flex items-center space-x-4'>
                  <img
                    src={product.img}
                    alt={product.name}
                    className='w-20 h-20 object-cover rounded-md'
                  />
                  <span>
                    {product.name} (x{basket[productId]})
                  </span>
                </div>
                <span className='font-bold'>
                  ${(product.price * basket[productId]).toFixed(2)}
                </span>
              </li>
            ) : null;
          })}
        </ul>
        <button
          onClick={onClose}
          className='w-full mt-4 bg-red-600 text-white p-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
        >
          Close
        </button>
      </div>
      <div
        className='absolute top-0 left-0 w-full h-full bg-black opacity-40'
        onClick={onClose}
      ></div>
    </div>
  );
};

export default BasketModal;
