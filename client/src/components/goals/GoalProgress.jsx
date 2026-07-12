export default function GoalProgress({ percentage }) {
  let color = "bg-emerald-500";

  if (percentage >= 100) {
    color = "bg-cyan-500";
  } else if (percentage >= 75) {
    color = "bg-yellow-500";
  } else if (percentage >= 50) {
    color = "bg-indigo-500";
  }

  return (
    <div className="mt-5">
      <div className="mb-2 flex justify-between">
        <span className="text-slate-400">Progress</span>

        <span className="font-semibold text-white">{percentage}%</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full ${color} transition-all duration-700`}
          style={{
            width: `${Math.min(percentage, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}
