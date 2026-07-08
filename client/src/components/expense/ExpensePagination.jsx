import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ExpensePagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  return (
    <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-3 sm:gap-4 mt-8">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white transition"
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      <div className="min-w-[90px] text-center px-5 py-2.5 rounded-xl bg-red-600 text-white font-semibold">
        {currentPage} / {totalPages}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white transition"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
