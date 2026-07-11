export default function BudgetSummary({ budgets }) {
  const totalBudget = budgets.reduce((sum, item) => sum + item.limit, 0);

  const totalSpent = budgets.reduce((sum, item) => sum + item.spent, 0);

  const remaining = totalBudget - totalSpent;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
        <p className="text-slate-400 text-sm">Total Budget</p>
        <h2 className="mt-2 text-3xl font-bold text-white">
          ₹{totalBudget.toLocaleString()}
        </h2>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
        <p className="text-slate-400 text-sm">Spent</p>
        <h2 className="mt-2 text-3xl font-bold text-red-400">
          ₹{totalSpent.toLocaleString()}
        </h2>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
        <p className="text-slate-400 text-sm">Remaining</p>
        <h2 className="mt-2 text-3xl font-bold text-green-400">
          ₹{remaining.toLocaleString()}
        </h2>
      </div>
    </div>
  );
}
