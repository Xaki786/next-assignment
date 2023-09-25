import { Basket } from "@common/types";
import { useCallback, useState } from "react";

export const useProducts = () => {
  const [basket, setBasket] = useState<Basket>(new Map());
  const updateBasket = useCallback(
    (productId: number, quantity: number) => {
      if (quantity > 0) {
        setBasket(new Map(basket.set(productId, quantity)));
      } else {
        basket.delete(productId);
        setBasket(new Map(basket));
      }
    },
    [basket],
  );
  const handleIncreaseQuantity = useCallback(
    (productId: number) => {
      const quantity = basket.get(productId) || 0;
      updateBasket(productId, quantity + 1);
    },
    [updateBasket, basket],
  );

  const handleReduceQuantity = useCallback(
    (productId: number) => {
      const quantity = basket.get(productId) || 0;
      updateBasket(productId, quantity - 1);
    },
    [updateBasket, basket],
  );

  const handleRemoveFromBasket = useCallback(
    (productId: number) => {
      updateBasket(productId, 0);
    },
    [updateBasket],
  );

  return {
    basket,
    handleIncreaseQuantity,
    handleReduceQuantity,
    handleRemoveFromBasket,
  };
};
