/** @format */

import React from 'react';

type QuantityChangeButton = {
  onChangeQuantity: (productId: number) => void;
  disabled?: boolean;
  productId: number;
  operator: string;
};

const QuantityChangeButton: React.FC<QuantityChangeButton> = ({
  onChangeQuantity,
  productId,
  operator,
  disabled = false,
}) => {
  const disabledClass = disabled
    ? `hover:opacity-70 hover:cursor-not-allowed`
    : 'hover:bg-gray-400';
  return (
    <button
      onClick={() => onChangeQuantity(productId)}
      className={`bg-gray-300 w-4 h-4 text-white p-4 rounded ${disabledClass} focus:outline-none focus:ring-2 focus:ring-white-950 focus:ring-opacity-50 flex justify-center items-center`}
      disabled={disabled}
    >
      <span className='text-gray-500 hover:text-gray-600'>{operator}</span>
    </button>
  );
};

export default QuantityChangeButton;
