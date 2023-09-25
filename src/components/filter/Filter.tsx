/** @format */

import React from "react";

type FilterProps = {
  selectedFilter: string;
  filterValues: string[];
  onFilter: (color: string) => void;
};

const Filter: React.FC<FilterProps> = ({
  selectedFilter,
  onFilter,
  filterValues = [],
}) => {
  if (!filterValues.length) {
    return null;
  }
  return (
    <div className="w-full h-12">
      <label
        htmlFor="colorFilter"
        className="block text-sm font-medium text-gray-700"
      >
        Filter by Color
      </label>
      <select
        id="colorFilter"
        value={selectedFilter}
        onChange={(e) => onFilter(e.target.value)}
        className="mt-2 block w-full bg-white pl-4 pr-16 py-3 text-base border border-gray-300 hover:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500 shadow-sm sm:text-sm rounded-lg transition duration-200 ease-in"
      >
        <option value="" key="All">
          All
        </option>
        {filterValues.map((filter) => (
          <option value={filter} key={filter}>
            {filter}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(Filter);
