/** @format */

import { render, screen, fireEvent } from "@testing-library/react";
import QuantityChangeButton from "./QuantityChangeButton";
describe("<QuantityChangeButton/>", () => {
  it("should render a button with the correct text", () => {
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
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(operator);
  });

  it("should call onChangeQuantity function with the correct productId when clicked", () => {
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

    fireEvent.click(button);

    expect(onChangeQuantity).toHaveBeenCalledTimes(1);
    expect(onChangeQuantity).toHaveBeenCalledWith(productId);
  });

  it("should render the button as disabled when disabled prop is true", () => {
    const onChangeQuantity = jest.fn();
    const productId = 1;
    const operator = "+";
    const disabled = true;

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
    expect(button).toBeDisabled();
  });
});
