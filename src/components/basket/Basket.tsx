/** @format */

import Image from "next/image";
import { Basket as BasketType, IndexedProducts } from "@common/types";
import React from "react";

type BasketProps = {
  indexedProducts: IndexedProducts;
  basket: BasketType;
};

const Basket: React.FC<BasketProps> = ({ basket, indexedProducts }) => {
  const basketKeys = Array.from(basket.keys()).reverse();
  const getTotal = () => {
    return basketKeys.reduce((acc, productId) => {
      const product = indexedProducts[productId];
      const quantity = basket.get(product.id) as number;
      if (product) {
        return acc + product.price * quantity;
      }
      return acc;
    }, 0);
  };

  return (
    <div
      className="border p-4 rounded-md shadow-sm space-y-4 bg-white"
      data-testid="basket-component"
    >
      <h2 className="text-xl font-bold border-b pb-2">Your Basket</h2>
      <ul className="space-y-2">
        {basketKeys.map((productId) => {
          const product = indexedProducts[productId];
          const quantity = basket.get(product.id) as number;
          return product ? (
            <li
              key={productId}
              className="flex justify-between items-center border-b pb-2 pt-2"
              data-testid="basket-item"
            >
              <div className="flex items-center space-x-2">
                <Image
                  src={product.img}
                  alt={product.name}
                  width={60}
                  height={60}
                  className="w-16 object-cover rounded-md mr-4"
                />
                <div>
                  {product.name}
                  <p className="text-gray-400">Quantity: x{quantity}</p>
                </div>
              </div>
              <span className="font-bold ml-4">
                ${(product.price * quantity).toFixed(2)}
              </span>
            </li>
          ) : null;
        })}
      </ul>
      <div className="flex justify-between font-bold mt-4">
        <span>Total:</span>
        <span>${getTotal().toFixed(2)}</span>
      </div>
    </div>
  );
};

export default React.memo(Basket);
