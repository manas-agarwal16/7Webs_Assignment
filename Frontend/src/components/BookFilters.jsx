import React from "react";

const sortOptions = [
  { value: "date", label: "Newest" },
  { value: "rating", label: "Top Rated" },
];

const BookFilters = ({ filters, setFilters }) => (
  <div className="flex flex-wrap gap-4 mb-6 justify-between items-end">
    <input
      placeholder="Filter by author"
      value={filters.author}
      onChange={(e) => setFilters((f) => ({ ...f, author: e.target.value }))}
      className="
        rounded 
        border border-gray-300 
        bg-white text-gray-900
        px-3 py-2 shadow-sm w-48
        focus:outline-none focus:ring-2 focus:ring-blue-500
        dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
        dark:focus:ring-blue-400
      "
    />
    <input
      placeholder="Filter by genre"
      value={filters.genre}
      onChange={(e) => setFilters((f) => ({ ...f, genre: e.target.value }))}
      className="
        rounded 
        border border-gray-300 
        bg-white text-gray-900
        px-3 py-2 shadow-sm w-40
        focus:outline-none focus:ring-2 focus:ring-blue-500
        dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
        dark:focus:ring-blue-400
      "
    />
    <select
      value={filters.sortBy}
      onChange={(e) => setFilters((f) => ({ ...f, sortBy: e.target.value }))}
      className="
        rounded 
        border border-gray-300 
        bg-white text-gray-900
        px-3 py-2 shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500
        dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
        dark:focus:ring-blue-400
      "
    >
      {sortOptions.map((opt) => (
        <option
          key={opt.value}
          value={opt.value}
          className="dark:bg-gray-700 dark:text-gray-100"
        >
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default BookFilters;
