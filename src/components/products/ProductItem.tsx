/** @format */

import React from "react";
import Image from "next/image";
import QuantityChangeButton from "./QuantityChangeButton";
import { Product } from "@common/types";

type ProductItemProps = {
  product: Product;
  basketQty: number;
  onRemove: (id: number) => void;
  onAdd: (productId: number) => void;
  onReduce: (productId: number) => void;
};

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  basketQty,
  onAdd,
  onReduce,
  onRemove,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 p-4 border-b min-w-64">
      <div className="flex justify-center items-center w-full sm:w-1/4">
        <Image
          src={product.img}
          alt={product.name}
          fill={false}
          width={175}
          height={50}
          className="object-contain rounded-md"
        />
      </div>

      <div className="w-full sm:w-1/2">
        <div className="space-y-2">
          <p className="font-bold">{product.name}</p>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
          <div className="w-48">
            <div className="space-x-2 flex justify-between items-center">
              <span className="text-gray-600">Quantity</span>
              <QuantityChangeButton
                onChangeQuantity={onReduce}
                productId={product.id}
                disabled={!basketQty}
                operator="-"
              />
              <span>{basketQty}</span>
              <QuantityChangeButton
                onChangeQuantity={onAdd}
                productId={product.id}
                operator="+"
              />
            </div>
          </div>
          {!!basketQty && (
            <div className="mt-6 w-48 flex flex-wrap justify-center content-center">
              <button
                onClick={() => onRemove(product.id)}
                className="bg-red-500 mt-4 text-white px-2 py-1 rounded w-full block"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductItem);
