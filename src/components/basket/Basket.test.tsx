/** @format */

import { render } from "@testing-library/react";
import Basket from "./Basket";

describe("<Basket />", () => {
  it("should render the basket component with the correct data", () => {
    const basket = new Map<number, number>();
    basket.set(1, 2);
    basket.set(2, 3);
    const indexedProducts = {
      1: {
        id: 1,
        name: "Product 1",
        price: 10,
        img: "http://sample.com/product1.jpg",
        colour: "red",
      },
      2: {
        id: 2,
        name: "Product 2",
        price: 20,
        img: "http://sample.com/product2.jpg",
        colour: "blue",
      },
    };

    const { getByText, getByAltText } = render(
      <Basket basket={basket} indexedProducts={indexedProducts} />
    );

    expect(getByText("Your Basket")).toBeInTheDocument();
    expect(getByText("Product 1")).toBeInTheDocument();
    expect(getByText("Product 2")).toBeInTheDocument();
    expect(getByAltText("Product 1")).toBeInTheDocument();
    expect(getByAltText("Product 2")).toBeInTheDocument();
  });

  it("should calculate the total price of the basket correctly", () => {
    const basket = new Map<number, number>();
    basket.set(1, 2);
    basket.set(2, 3);
    const indexedProducts = {
      1: {
        id: 1,
        name: "Product 1",
        price: 10,
        img: "http://sample.com/product1.jpg",
        colour: "red",
      },
      2: {
        id: 2,
        name: "Product 2",
        price: 20,
        img: "http://sample.com/product2.jpg",
        colour: "blue",
      },
    };

    const { getByText } = render(
      <Basket basket={basket} indexedProducts={indexedProducts} />
    );

    const totalPrice = 2 * 10 + 3 * 20;

    expect(getByText(`$${totalPrice.toFixed(2)}`)).toBeInTheDocument();
  });

  it("should handle empty basket", () => {
    const basket = new Map<number, number>();
    const indexedProducts = {
      1: {
        id: 1,
        name: "Product 1",
        price: 10,
        img: "http://sample.com/product1.jpg",
        colour: "red",
      },
      2: {
        id: 2,
        name: "Product 2",
        price: 20,
        img: "http://sample.com/product2.jpg",
        colour: "blue",
      },
    };

    const { getByText } = render(
      <Basket basket={basket} indexedProducts={indexedProducts} />
    );

    expect(getByText("Your Basket")).toBeInTheDocument();
    expect(getByText("Total:")).toBeInTheDocument();
    expect(getByText("$0.00")).toBeInTheDocument();
  });

  it("should render the correct quantity of each product in the basket", () => {
    const basket = new Map<number, number>();
    basket.set(1, 2);
    basket.set(2, 3);
    const indexedProducts = {
      1: {
        id: 1,
        name: "Product 1",
        price: 10,
        img: "http://sample.com/product1.jpg",
        colour: "red",
      },
      2: {
        id: 2,
        name: "Product 2",
        price: 20,
        img: "http://sample.com/product2.jpg",
        colour: "blue",
      },
    };

    const { getByText } = render(
      <Basket basket={basket} indexedProducts={indexedProducts} />
    );

    expect(getByText("Quantity: x2")).toBeInTheDocument();
    expect(getByText("Quantity: x3")).toBeInTheDocument();
  });
});
