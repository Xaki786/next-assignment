/** @format */
import { render, screen, fireEvent } from "@testing-library/react";
import ProductItem from "./ProductItem";

jest.mock("next/image", () => ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} />
));
describe("<ProductItem />", () => {
  it("should render the product item with correct details", () => {
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

    expect(screen.getByAltText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("$10.99")).toBeInTheDocument();
    expect(screen.getByText("Quantity")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("should increment and decrement the quantity correctly when QuantityChangeButton is clicked", () => {
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

    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("-"));

    expect(onAdd).toHaveBeenCalledWith(1);
    expect(onReduce).toHaveBeenCalledWith(1);
  });

  it("should remove the product from the basket when Remove button is clicked", () => {
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

    fireEvent.click(screen.getByText("Remove"));

    expect(onRemove).toHaveBeenCalledWith(1);
  });

  it("renders the image correctly", () => {
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

    expect(imageElement).toBeInTheDocument();
  });

  it("should add the product to the basket when add button is clicked", () => {
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

    fireEvent.click(screen.getByTestId(`quantity-change-button-1-+`));

    expect(onAdd).toHaveBeenCalledWith(1);
  });

  it("should disable QuantityChangeButton when basketQty is 0", () => {
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

    expect(screen.getByTestId(`quantity-change-button-119--`)).toBeDisabled();
  });

  it("should not decrement the quantity below 0 when QuantityChangeButton is clicked", () => {
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

    fireEvent.click(screen.getByTestId(`quantity-change-button-1--`));

    expect(onReduce).not.toHaveBeenCalled();
  });

  it("should not call onReduce when QuantityChangeButton is disabled", () => {
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

    expect(onReduce).not.toHaveBeenCalled();
  });

  it("should render the product item with correct values", () => {
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

    expect(screen.getByAltText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("$10.99")).toBeInTheDocument();
    expect(screen.getByText("Quantity")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
