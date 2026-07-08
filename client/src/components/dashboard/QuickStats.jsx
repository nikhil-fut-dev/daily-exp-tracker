import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

export default function QuickStats({ incomeCount, expenseCount }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-6">Quick Statistics</h2>

      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-green-500" />

            <span className="text-slate-300">Income Entries</span>
          </div>

          <span className="text-white font-bold">{incomeCount}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <TrendingDown className="text-red-500" />

            <span className="text-slate-300">Expense Entries</span>
          </div>

          <span className="text-white font-bold">{expenseCount}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Wallet className="text-indigo-500" />

            <span className="text-slate-300">Total Transactions</span>
          </div>

          <span className="text-white font-bold">
            {incomeCount + expenseCount}
          </span>
        </div>
      </div>
    </div>
  );
}
