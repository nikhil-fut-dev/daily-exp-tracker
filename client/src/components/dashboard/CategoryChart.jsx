import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import { useState } from "react";

const COLORS = [
  "#6366f1",
  "#22c55e",
  "#ef4444",
  "#f59e0b",
  "#06b6d4",
  "#8b5cf6",
];

export default function CategoryChart({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-7 shadow-xl hover:border-slate-700 transition-all">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Expense Categories</h2>

        <p className="text-slate-400 text-sm mt-1">
          Distribution of your expenses
        </p>
      </div>

      <div className="relative w-full h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={78}
              outerRadius={125}
              paddingAngle={4}
              cornerRadius={8}
              activeIndex={activeIndex}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#0f172a"
                  strokeWidth={2}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [`₹${value.toLocaleString()}`, "Amount"]}
              contentStyle={{
                background: "#111827",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Legend
              iconType="circle"
              verticalAlign="bottom"
              wrapperStyle={{
                color: "#cbd5e1",
                paddingTop: 20,
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {activeIndex !== null ? (
            <>
              <span className="text-3xl font-bold text-white">
                ₹{data[activeIndex].value.toLocaleString()}
              </span>

              <span className="text-slate-400 mt-1">
                {data[activeIndex].name}
              </span>

              <span className="text-xs text-slate-500 mt-1">
                {((data[activeIndex].value / total) * 100).toFixed(1)}%
              </span>
            </>
          ) : (
            <>
              <span className="text-3xl font-bold text-white">
                ₹{total.toLocaleString()}
              </span>

              <span className="text-slate-400 mt-1">Total Expense</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
