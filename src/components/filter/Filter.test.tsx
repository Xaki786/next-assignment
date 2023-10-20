/** @format */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Filter from "./Filter";
describe("<Filter />", () => {
  it("should render a select element with options", () => {
    const selectedFilter = "";
    const filterValues = ["Red", "Blue", "Green"];
    const onFilter = jest.fn();

    render(
      <Filter
        selectedFilter={selectedFilter}
        filterValues={filterValues}
        onFilter={onFilter}
      />
    );

    expect(screen.getByLabelText("Filter by Color")).toBeInTheDocument();
    expect(screen.getByLabelText("Filter by Color")).toHaveValue("");
    expect(screen.getByLabelText("Filter by Color")).toHaveTextContent("All");
    expect(screen.getByLabelText("Filter by Color")).toHaveTextContent("Red");
    expect(screen.getByLabelText("Filter by Color")).toHaveTextContent("Blue");
    expect(screen.getByLabelText("Filter by Color")).toHaveTextContent("Green");
  });

  it('should display the default "All" option', () => {
    const selectedFilter = "";
    const filterValues = ["Red", "Blue", "Green"];
    const onFilter = jest.fn();

    render(
      <Filter
        selectedFilter={selectedFilter}
        filterValues={filterValues}
        onFilter={onFilter}
      />
    );

    expect(screen.getByLabelText("Filter by Color")).toHaveValue("");
    expect(screen.getByLabelText("Filter by Color")).toHaveTextContent("All");
  });

  it("should display the selected filter value", () => {
    const selectedFilter = "Red";
    const filterValues = ["Red", "Blue", "Green"];
    const onFilter = jest.fn();

    render(
      <Filter
        selectedFilter={selectedFilter}
        filterValues={filterValues}
        onFilter={onFilter}
      />
    );

    expect(screen.getByLabelText("Filter by Color")).toHaveValue("Red");
  });

  it("should return null when filterValues is an empty array", () => {
    const selectedFilter = "";
    const filterValues: string[] = [];
    const onFilter = jest.fn();

    const { container } = render(
      <Filter
        selectedFilter={selectedFilter}
        filterValues={filterValues}
        onFilter={onFilter}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});
