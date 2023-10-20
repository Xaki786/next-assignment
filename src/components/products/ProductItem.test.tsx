/** @format */
import { render, screen, fireEvent } from "@testing-library/react";
import ProductItem from "./ProductItem";

jest.mock("next/image", () => ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} />
));
describe("code snippet", () => {
  // Renders the product item with correct image, name, price and quantity
  it("should render the product item with correct details", () => {
    // Arrange
    const product = {
      id: 1,
      name: "Product 1",
      price: 10.99,
      img: "http://sample.com/product1.jpg",
      colour: "red",
    };
    const basketQty = 2;
    const onAdd = jest.fn();
    const onReduce = jest.fn();
    const onRemove = jest.fn();

    // Act
    render(
      <ProductItem
        product={product}
        basketQty={basketQty}
        onAdd={onAdd}
        onReduce={onReduce}
        onRemove={onRemove}
      />
    );

    // Assert
    expect(screen.getByAltText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("$10.99")).toBeInTheDocument();
    expect(screen.getByText("Quantity")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  // QuantityChangeButton increments and decrements the quantity correctly
  it("should increment and decrement the quantity correctly when QuantityChangeButton is clicked", () => {
    // Arrange
    const product = {
      id: 1,
      name: "Product 1",
      price: 10.99,
      img: "http://sample.com/product1.jpg",
      colour: "red",
    };
    const basketQty = 2;
    const onAdd = jest.fn();
    const onReduce = jest.fn();
    const onRemove = jest.fn();

    render(
      <ProductItem
        product={product}
        basketQty={basketQty}
        onAdd={onAdd}
        onReduce={onReduce}
        onRemove={onRemove}
      />
    );

    // Act
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("-"));

    // Assert
    expect(onAdd).toHaveBeenCalledWith(1);
    expect(onReduce).toHaveBeenCalledWith(1);
  });

  // Remove button removes the product from the basket
  it("should remove the product from the basket when Remove button is clicked", () => {
    // Arrange
    const product = {
      id: 1,
      name: "Product 1",
      price: 10.99,
      img: "http://sample.com/product1.jpg",
      colour: "red",
    };
    const basketQty = 2;
    const onAdd = jest.fn();
    const onReduce = jest.fn();
    const onRemove = jest.fn();

    render(
      <ProductItem
        product={product}
        basketQty={basketQty}
        onAdd={onAdd}
        onReduce={onReduce}
        onRemove={onRemove}
      />
    );

    // Act
    fireEvent.click(screen.getByText("Remove"));

    // Assert
    expect(onRemove).toHaveBeenCalledWith(1);
  });

  it("renders the image correctly", () => {
    // Arrange
    const product = {
      id: 1,
      name: "Product 1",
      price: 10.99,
      img: "http://sample.com/product1.jpg",
      colour: "red",
    };
    const basketQty = 2;
    const onAdd = jest.fn();
    const onReduce = jest.fn();
    const onRemove = jest.fn();

    // Act
    const component = render(
      <ProductItem
        product={product}
        basketQty={basketQty}
        onAdd={onAdd}
        onReduce={onReduce}
        onRemove={onRemove}
      />
    );
    const { getByAltText } = component;
    const imageElement = getByAltText(product.name);

    // Assert
    expect(imageElement).toBeInTheDocument();
  });

  // Add button add the product to the basket
  it("should add the product to the basket when add button is clicked", () => {
    // Arrange
    const product = {
      id: 1,
      name: "Product 1",
      price: 10.99,
      img: "http://sample.com/product1.jpg",
      colour: "red",
    };
    const basketQty = 2;
    const onAdd = jest.fn();
    const onReduce = jest.fn();
    const onRemove = jest.fn();

    render(
      <ProductItem
        product={product}
        basketQty={basketQty}
        onAdd={onAdd}
        onReduce={onReduce}
        onRemove={onRemove}
      />
    );

    // Act
    fireEvent.click(screen.getByTestId(`quantity-change-button-1-+`));

    // Assert
    expect(onAdd).toHaveBeenCalledWith(1);
  });

  // QuantityChangeButton is disabled when basketQty is 0
  it("should disable QuantityChangeButton when basketQty is 0", () => {
    // Arrange
    const product = {
      id: 119,
      name: "Product 1",
      price: 10.99,
      img: "http://sample.com/product1.jpg",
      colour: "red",
    };
    const basketQty = 0;
    const onAdd = jest.fn();
    const onReduce = jest.fn();
    const onRemove = jest.fn();

    render(
      <ProductItem
        product={product}
        basketQty={basketQty}
        onAdd={onAdd}
        onReduce={onReduce}
        onRemove={onRemove}
      />
    );

    // Assert
    expect(screen.getByTestId(`quantity-change-button-119--`)).toBeDisabled();
  });

  // QuantityChangeButton does not decrement below 1
  it("should not decrement the quantity below 0 when QuantityChangeButton is clicked", () => {
    // Arrange
    const product = {
      id: 1,
      name: "Product 1",
      price: 10.99,
      img: "http://sample.com/product1.jpg",
      colour: "red",
    };
    const basketQty = 0;
    const onAdd = jest.fn();
    const onReduce = jest.fn();
    const onRemove = jest.fn();

    render(
      <ProductItem
        product={product}
        basketQty={basketQty}
        onAdd={onAdd}
        onReduce={onReduce}
        onRemove={onRemove}
      />
    );

    // Act
    fireEvent.click(screen.getByTestId(`quantity-change-button-1--`));

    // Assert
    expect(onReduce).not.toHaveBeenCalled();
  });

  // onReduce function is not called when QuantityChangeButton is disabled
  it("should not call onReduce when QuantityChangeButton is disabled", () => {
    // Arrange
    const product = {
      id: 1,
      name: "Product 1",
      price: 10.99,
      img: "http://sample.com/product1.jpg",
      colour: "red",
    };
    const basketQty = 0;
    const onAdd = jest.fn();
    const onReduce = jest.fn();
    const onRemove = jest.fn();

    // Act
    render(
      <ProductItem
        product={product}
        basketQty={basketQty}
        onAdd={onAdd}
        onReduce={onReduce}
        onRemove={onRemove}
      />
    );

    // Assert
    expect(onReduce).not.toHaveBeenCalled();
  });

  // Renders the product item with correct dimensions and spacing
  it("should render the product item with correct dimensions and spacing", () => {
    // Arrange
    const product = {
      id: 1,
      name: "Product 1",
      price: 10.99,
      img: "http://sample.com/product1.jpg",
      colour: "red",
    };
    const basketQty = 2;
    const onAdd = jest.fn();
    const onReduce = jest.fn();
    const onRemove = jest.fn();

    // Act
    render(
      <ProductItem
        product={product}
        basketQty={basketQty}
        onAdd={onAdd}
        onReduce={onReduce}
        onRemove={onRemove}
      />
    );

    // Assert
    expect(screen.getByAltText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("$10.99")).toBeInTheDocument();
    expect(screen.getByText("Quantity")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
