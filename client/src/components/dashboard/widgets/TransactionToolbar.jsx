import { Search, RotateCcw, FileSpreadsheet, FileText } from "lucide-react";

export default function TransactionToolbar({
  search,
  setSearch,

  type,
  setType,

  category,
  setCategory,

  date,
  setDate,

  sort,
  setSort,

  categories,

  onExcel,
  onPdf,

  onReset,

  onCloseMobile,
}) {
  return (
    <div className="border-b border-slate-800 bg-slate-900 p-4">
      {/* Search */}

      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          placeholder="Search transaction..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onCloseMobile?.();
          }}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-white outline-none"
        />
      </div>

      {/* Filters */}

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            onCloseMobile?.();
          }}
          className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-3 text-white"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            onCloseMobile?.();
          }}
          className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-3 text-white"
        >
          <option value="all">Category</option>

          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            onCloseMobile?.();
          }}
          className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-3 text-white"
        />

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            onCloseMobile?.();
          }}
          className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-3 text-white"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="high">Highest</option>
          <option value="low">Lowest</option>
        </select>
      </div>

      {/* Buttons */}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={onExcel}
          className="flex-1 rounded-xl bg-emerald-600 py-3 text-white"
        >
          Excel
        </button>

        <button
          onClick={onPdf}
          className="flex-1 rounded-xl bg-red-600 py-3 text-white"
        >
          PDF
        </button>

        <button
          onClick={onReset}
          className="w-full rounded-xl border border-slate-700 py-3 text-white hover:bg-slate-800 lg:w-auto lg:px-6"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
