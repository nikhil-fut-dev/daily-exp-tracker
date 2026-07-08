import { Search, ArrowUpDown } from "lucide-react";

export default function IncomeToolbar({ search, setSearch, sort, setSort }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Search */}

        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              py-3 text-sm sm:text-base
              pl-12
              pr-4
              text-white
              placeholder:text-slate-500
              focus:border-indigo-500
              focus:ring-2
              focus:ring-indigo-500/30
              outline-none
            "
          />
        </div>

        {/* Sort */}

        <div className="relative">
          <ArrowUpDown
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="
              w-full
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              py-3 text-sm sm:text-base
              pl-12
              pr-4
              text-white
              focus:border-indigo-500
              focus:ring-2
              focus:ring-indigo-500/30
              outline-none
            "
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="high">Highest Amount</option>
            <option value="low">Lowest Amount</option>
          </select>
        </div>
      </div>
    </div>
  );
}
