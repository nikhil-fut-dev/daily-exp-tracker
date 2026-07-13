import {
  X,
  ArrowDownCircle,
  ArrowUpCircle,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";

import TransactionToolbar from "./TransactionToolbar";
//import TransactionTable from "./TransactionTable";

import { exportToExcel } from "../../../utils/exportExcel";
import { exportToPDF } from "../../../utils/exportPdf";

export default function AllTransactionsModal({ open, onClose, dashboard }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("all");
  const [date, setDate] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  if (!open) return null;

  const transactions = [
    ...dashboard.incomes.map((i) => ({
      ...i,
      type: "income",
    })),
    ...dashboard.expenses.map((i) => ({
      ...i,
      type: "expense",
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const recordsPerPage = 8;
  const categories = [...new Set(transactions.map((item) => item.category))];
  const filtered = [...transactions]
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => (type === "all" ? true : item.type === type))
    .filter((item) => (category === "all" ? true : item.category === category))
    .filter((item) => (date ? item.date.slice(0, 10) === date : true))
    .sort((a, b) => {
      if (sort === "latest") return new Date(b.date) - new Date(a.date);
      if (sort === "oldest") return new Date(a.date) - new Date(b.date);
      if (sort === "high") return b.amount - a.amount;
      if (sort === "low") return a.amount - b.amount;
      return 0;
    });

  const lastIndex = page * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = filtered.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filtered.length / recordsPerPage);
  const handleExcel = () => {
    exportToExcel(filtered, "Transactions");
  };
  const handlePdf = () => {
    exportToPDF(filtered, "Transactions", "Transactions_Report");
  };
  const resetFilters = () => {
    setSearch("");
    setType("all");
    setCategory("all");
    setDate("");
    setSort("latest");
    setPage(1);
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
      />

      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="flex h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 p-6">
            <h2 className="text-2xl font-bold text-white">All Transactions</h2>

            <button
              onClick={onClose}
              className="rounded-xl bg-slate-800 p-2 hover:bg-slate-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <TransactionToolbar
              search={search}
              setSearch={setSearch}
              type={type}
              setType={setType}
              category={category}
              setCategory={setCategory}
              date={date}
              setDate={setDate}
              sort={sort}
              setSort={setSort}
              categories={categories}
              onExcel={handleExcel}
              onPdf={handlePdf}
              onReset={resetFilters}
              onCloseMobile={() => setShowFilters(false)} 
            />
          </div>

          {/* Mobile Filter Button */}

          <div className="border-b border-slate-800 p-4 lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-500"
            >
              <SlidersHorizontal size={18} />

              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {currentRecords.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        item.type === "income"
                          ? "bg-green-500/20"
                          : "bg-red-500/20"
                      }`}
                    >
                      {item.type === "income" ? (
                        <ArrowDownCircle className="text-green-400" />
                      ) : (
                        <ArrowUpCircle className="text-red-400" />
                      )}
                    </div>

                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>

                      <p className="text-sm text-slate-400">{item.category}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <h3
                      className={`font-bold ${
                        item.type === "income"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {item.type === "income" ? "+" : "-"}₹
                      {Number(item.amount).toLocaleString()}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 border-t border-slate-800 p-5">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="rounded-xl bg-slate-800 px-4 py-2 disabled:opacity-40"
            >
              Previous
            </button>

            <span className="text-slate-300">
              {page} / {totalPages || 1}
            </span>

            <button
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(page + 1)}
              className="rounded-xl bg-slate-800 px-4 py-2 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
