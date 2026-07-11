export default function BudgetProgress({ percentage, status }) {
  const colors = {
    safe: "bg-emerald-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
  };

  return (
    <div className="mt-5">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-slate-400">Used</span>

        <span className="text-white font-semibold">{percentage}%</span>
      </div>

      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-700 ${colors[status]}`}
          style={{
            width: `${Math.min(percentage, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}
