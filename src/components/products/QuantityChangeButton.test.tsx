/** @format */

import { render, screen, fireEvent } from "@testing-library/react";
import QuantityChangeButton from "./QuantityChangeButton";
describe("code snippet", () => {
  // Renders a button with the correct text
  it("should render a button with the correct text", () => {
    // Arrange
    const onChangeQuantity = jest.fn();
    const productId = 1;
    const operator = "+";
    const disabled = false;

    // Act
    render(
      <QuantityChangeButton
        onChangeQuantity={onChangeQuantity}
        productId={productId}
        operator={operator}
        disabled={disabled}
      />
    );

    // Assert
    const button = screen.getByTestId(
      `quantity-change-button-${productId}-${operator}`
    );
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(operator);
  });

  // Calls onChangeQuantity function with the correct productId when clicked
  it("should call onChangeQuantity function with the correct productId when clicked", () => {
    // Arrange
    const onChangeQuantity = jest.fn();
    const productId = 1;
    const operator = "+";
    const disabled = false;
    render(
      <QuantityChangeButton
        onChangeQuantity={onChangeQuantity}
        productId={productId}
        operator={operator}
        disabled={disabled}
      />
    );
    const button = screen.getByTestId(
      `quantity-change-button-${productId}-${operator}`
    );

    // Act
    fireEvent.click(button);

    // Assert
    expect(onChangeQuantity).toHaveBeenCalledTimes(1);
    expect(onChangeQuantity).toHaveBeenCalledWith(productId);
  });

  // Renders the button as disabled when disabled prop is true
  it("should render the button as disabled when disabled prop is true", () => {
    // Arrange
    const onChangeQuantity = jest.fn();
    const productId = 1;
    const operator = "+";
    const disabled = true;

    // Act
    render(
      <QuantityChangeButton
        onChangeQuantity={onChangeQuantity}
        productId={productId}
        operator={operator}
        disabled={disabled}
      />
    );

    // Assert
    const button = screen.getByTestId(
      `quantity-change-button-${productId}-${operator}`
    );
    expect(button).toBeDisabled();
  });
});
