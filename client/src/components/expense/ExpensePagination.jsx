import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ExpensePagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="flex items-center gap-2 px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white"
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      <div className="px-5 py-2 rounded-xl bg-red-600 text-white">
        {currentPage} / {totalPages}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="flex items-center gap-2 px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
