import React from "react";

const Pagination = ({ page, setPage, hasNext }) => (
  <div className="flex justify-center items-center gap-4 my-8">
    <button
      className="
        px-4 py-2 rounded-md bg-[#232842] text-blue-400 font-semibold
        shadow-sm hover:bg-[#2d335a] disabled:text-gray-600 disabled:cursor-not-allowed
        disabled:bg-[#1a2233] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75
        transition-colors
      "
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
      aria-label="Previous page"
    >
      Prev
    </button>

    <span className="font-semibold text-blue-300 select-none min-w-[24px] text-center">
      {page}
    </span>

    <button
      className="
        px-4 py-2 rounded-md bg-[#232842] text-blue-400 font-semibold
        shadow-sm hover:bg-[#2d335a] disabled:text-gray-600 disabled:cursor-not-allowed
        disabled:bg-[#1a2233] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75
        transition-colors
      "
      disabled={!hasNext}
      onClick={() => setPage(page + 1)}
      aria-label="Next page"
    >
      Next
    </button>
  </div>
);

export default Pagination;
