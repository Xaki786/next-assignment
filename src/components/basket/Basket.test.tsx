/** @format */

import { render, screen } from "@testing-library/react";
import Basket from "./Basket";

describe("<Basket />", () => {
  it("should render the basket component with the correct data", () => {
    // Mock data
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

    // Render the component
    const { getByText, getByAltText } = render(
      <Basket basket={basket} indexedProducts={indexedProducts} />
    );

    // Assert that the component renders with the correct data
    expect(getByText("Your Basket")).toBeInTheDocument();
    expect(getByText("Product 1")).toBeInTheDocument();
    expect(getByText("Product 2")).toBeInTheDocument();
    expect(getByAltText("Product 1")).toBeInTheDocument();
    expect(getByAltText("Product 2")).toBeInTheDocument();
  });

  // Calculates the total price of the basket correctly
  it("should calculate the total price of the basket correctly", () => {
    // Mock data
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

    // Render the component
    const { getByText } = render(
      <Basket basket={basket} indexedProducts={indexedProducts} />
    );

    // Calculate the expected total price
    const totalPrice = 2 * 10 + 3 * 20;

    // Assert that the component displays the correct total price
    expect(getByText(`$${totalPrice.toFixed(2)}`)).toBeInTheDocument();
  });

  // Handles empty basket
  it("should handle empty basket", () => {
    // Mock data
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

    // Render the component
    const { getByText } = render(
      <Basket basket={basket} indexedProducts={indexedProducts} />
    );

    // Assert that the component displays the correct message for an empty basket
    expect(getByText("Your Basket")).toBeInTheDocument();
    expect(getByText("Total:")).toBeInTheDocument();
    expect(getByText("$0.00")).toBeInTheDocument();
  });

  // Renders the correct quantity of each product in the basket
  it("should render the correct quantity of each product in the basket", () => {
    // Mock data
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

    // Render the component
    const { getByText } = render(
      <Basket basket={basket} indexedProducts={indexedProducts} />
    );

    // Assert that the component displays the correct quantity for each product
    expect(getByText("Quantity: x2")).toBeInTheDocument();
    expect(getByText("Quantity: x3")).toBeInTheDocument();
  });
});
