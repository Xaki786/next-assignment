/** @format */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Filter from "./Filter";
describe("<Filter />", () => {
  it("should render a select element with options", () => {
    // Arrange
    const selectedFilter = "";
    const filterValues = ["Red", "Blue", "Green"];
    const onFilter = jest.fn();

    // Act
    render(
      <Filter
        selectedFilter={selectedFilter}
        filterValues={filterValues}
        onFilter={onFilter}
      />
    );

    // Assert
    expect(screen.getByLabelText("Filter by Color")).toBeInTheDocument();
    expect(screen.getByLabelText("Filter by Color")).toHaveValue("");
    expect(screen.getByLabelText("Filter by Color")).toHaveTextContent("All");
    expect(screen.getByLabelText("Filter by Color")).toHaveTextContent("Red");
    expect(screen.getByLabelText("Filter by Color")).toHaveTextContent("Blue");
    expect(screen.getByLabelText("Filter by Color")).toHaveTextContent("Green");
  });

  // displays the default "All" option
  it('should display the default "All" option', () => {
    // Arrange
    const selectedFilter = "";
    const filterValues = ["Red", "Blue", "Green"];
    const onFilter = jest.fn();

    // Act
    render(
      <Filter
        selectedFilter={selectedFilter}
        filterValues={filterValues}
        onFilter={onFilter}
      />
    );

    // Assert
    expect(screen.getByLabelText("Filter by Color")).toHaveValue("");
    expect(screen.getByLabelText("Filter by Color")).toHaveTextContent("All");
  });

  // displays the selected filter value
  it("should display the selected filter value", () => {
    // Arrange
    const selectedFilter = "Red";
    const filterValues = ["Red", "Blue", "Green"];
    const onFilter = jest.fn();

    // Act
    render(
      <Filter
        selectedFilter={selectedFilter}
        filterValues={filterValues}
        onFilter={onFilter}
      />
    );

    // Assert
    expect(screen.getByLabelText("Filter by Color")).toHaveValue("Red");
  });

  // filterValues is an empty array, returns null
  it("should return null when filterValues is an empty array", () => {
    // Arrange
    const selectedFilter = "";
    const filterValues: string[] = [];
    const onFilter = jest.fn();

    // Act
    const { container } = render(
      <Filter
        selectedFilter={selectedFilter}
        filterValues={filterValues}
        onFilter={onFilter}
      />
    );

    // Assert
    expect(container.firstChild).toBeNull();
  });
});
