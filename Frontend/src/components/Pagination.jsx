import React from "react";

const Pagination = ({ page, setPage, hasNext }) => (
  <div className="flex justify-center items-center gap-2 my-8">
    <button
      className="px-3 py-1 rounded bg-blue-100 hover:bg-blue-300 text-blue-800 disabled:opacity-50"
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
    >
      Prev
    </button>
    <span className="font-semibold">{page}</span>
    <button
      className="px-3 py-1 rounded bg-blue-100 hover:bg-blue-300 text-blue-800 disabled:opacity-50"
      disabled={!hasNext}
      onClick={() => setPage(page + 1)}
    >
      Next
    </button>
  </div>
);

export default Pagination;
