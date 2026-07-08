import { ChevronLeft, ChevronRight } from "lucide-react";

export default function IncomePagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white text-sm sm:text-base transition"
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      <div className="px-4 sm:px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-sm sm:text-base">
        {currentPage} / {totalPages}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white text-sm sm:text-base transition"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
