import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { motion } from "framer-motion";

export default function BudgetProgress({ percentage, status }) {
  const colorMap = {
    safe: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
  };

  const bgMap = {
    safe: "bg-emerald-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
  };

  const color = colorMap[status] || "#6366F1";

  return (
    <div className="mt-6">
      <div className="flex items-center gap-6">
        {/* Circular Progress */}

        <div className="w-24 h-24">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textColor: "#fff",
              pathColor: color,
              trailColor: "#1e293b",
              textSize: "18px",
            })}
          />
        </div>

        {/* Progress Details */}

        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <span className="text-slate-400">Budget Used</span>

            <span className="font-semibold text-white">{percentage}%</span>
          </div>

          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(percentage, 100)}%`,
              }}
              transition={{
                duration: 1,
              }}
              className={`h-full ${bgMap[status]}`}
            />
          </div>

          <p className="mt-3 text-sm text-slate-400">
            {status === "safe" && "You're spending within budget."}

            {status === "warning" && "You're approaching your budget limit."}

            {status === "danger" && "You've exceeded your monthly budget."}
          </p>
        </div>
      </div>
    </div>
  );
}
