import {
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function RecentTransactions({
  transactions = [],
  pagination,
  page,
  setPage,
}) {
  const start =
    pagination?.totalTransactions === 0
      ? 0
      : (pagination.page - 1) * pagination.limit + 1;

  const end = Math.min(
    pagination?.page * pagination?.limit,
    pagination?.totalTransactions || 0,
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl min-h-[700px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Recent Transactions</h2>

          <p className="text-slate-400 text-sm">
            Latest income & expense history
          </p>
        </div>
      </div>

      {/* Transactions */}
      <div className="space-y-4 flex-1">
        {transactions.length === 0 ? (
          <div className="text-center text-slate-500 py-10">
            No Transactions Found
          </div>
        ) : (
          transactions.map((item) => {
            const income = item.type?.toLowerCase() === "income";

            return (
              <div
                key={item.id}
                className="flex items-center justify-between bg-slate-800 hover:bg-slate-700 rounded-2xl p-4 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      income ? "bg-green-600" : "bg-red-500"
                    }`}
                  >
                    {income ? (
                      <ArrowUpCircle className="text-white" />
                    ) : (
                      <ArrowDownCircle className="text-white" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>

                    <p className="text-sm text-slate-400">{item.category}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={`font-bold text-lg ${
                      income ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {income ? "+" : "-"}₹{item.amount}
                  </p>

                  <p className="text-xs text-slate-400">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      <div className="mt-auto pt-8">
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              Showing <span className="text-white">{start}</span> -
              <span className="text-white"> {end}</span> of{" "}
              <span className="text-white">{pagination.totalTransactions}</span>{" "}
              transactions
            </p>

            <div className="flex items-center gap-2">
              {/* Previous */}
              <button
                onClick={() => setPage(page - 1)}
                disabled={!pagination.hasPrev}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={18} />
                Prev
              </button>

              {/* Page Numbers */}
              {Array.from({ length: pagination.totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index + 1)}
                  className={`w-10 h-10 rounded-xl font-semibold transition ${
                    page === index + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              {/* Next */}
              <button
                onClick={() => setPage(page + 1)}
                disabled={!pagination.hasNext}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
