import BudgetItem from "./BudgetItem";

export default function BudgetOverview({ dashboard }) {
  const budgets = dashboard.budgets.slice(0, 5);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Budget Overview</h2>

        <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs text-indigo-400">
          {dashboard.budgets.length} Budgets
        </span>
      </div>

      <div className="space-y-4">
        {budgets.map((budget) => (
          <BudgetItem key={budget._id} budget={budget} />
        ))}
      </div>
    </div>
  );
}
