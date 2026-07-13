
export default function BudgetItem({ budget }) {
  const spent = Number(budget.spent || 0);
  const limit = Number(budget.limit);

  const percent = Math.min((spent / limit) * 100, 100);

  const remaining = limit - spent;

  const color =
    percent >= 90
      ? "bg-red-500"
      : percent >= 70
        ? "bg-yellow-500"
        : "bg-emerald-500";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-white">{budget.category}</h3>

          <p className="mt-1 text-sm text-slate-400">
            ₹{spent.toLocaleString()} / ₹{limit.toLocaleString()}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${color}`}
        >
          {percent.toFixed(0)}%
        </span>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-700">
        <div
          className={`${color} h-full rounded-full transition-all duration-500`}
          style={{
            width: `${percent}%`,
          }}
        />
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Remaining ₹{remaining.toLocaleString()}
      </p>
    </div>
  );
}
