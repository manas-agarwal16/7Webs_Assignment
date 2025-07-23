import React from "react";

const sortOptions = [{ value: "date", label: "Newest" }, { value: "rating", label: "Top Rated" }];

const BookFilters = ({ filters, setFilters }) => (
  <div className="flex flex-wrap gap-4 mb-6 justify-between items-end">
    <input
      placeholder="Filter by author"
      value={filters.author}
      onChange={e => setFilters(f => ({ ...f, author: e.target.value }))}
      className="rounded border-gray-300 px-3 py-2 shadow-sm w-48"
    />
    <input
      placeholder="Filter by genre"
      value={filters.genre}
      onChange={e => setFilters(f => ({ ...f, genre: e.target.value }))}
      className="rounded border-gray-300 px-3 py-2 shadow-sm w-40"
    />
    <select
      value={filters.sortBy}
      onChange={e => setFilters(f => ({ ...f, sortBy: e.target.value }))}
      className="rounded border-gray-300 px-3 py-2 shadow-sm"
    >
      {sortOptions.map(opt => (
        <option value={opt.value} key={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export default BookFilters;
