import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";

export default function MonthlyChart({ data }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-7 shadow-xl transition-all duration-300 hover:border-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-wide text-white">
            Monthly Overview
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Income vs Expense Comparison
          </p>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-slate-300">Income</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="text-slate-300">Expense</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={data} barGap={10} barCategoryGap="25%">
          <CartesianGrid
            vertical={false}
            stroke="#334155"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#94a3b8",
              fontSize: 13,
            }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#94a3b8",
              fontSize: 13,
            }}
          />

          <Tooltip
            cursor={{
              fill: "rgba(148,163,184,0.08)",
            }}
            contentStyle={{
              background: "#111827",
              border: "1px solid #334155",
              borderRadius: "14px",
              color: "#fff",
              boxShadow: "0 10px 30px rgba(0,0,0,.35)",
            }}
            labelStyle={{
              color: "#fff",
              fontWeight: 600,
              marginBottom: "6px",
            }}
          />

          <Legend
            iconType="circle"
            wrapperStyle={{
              color: "#cbd5e1",
              paddingTop: "18px",
            }}
          />

          <Bar
            dataKey="income"
            fill="#22c55e"
            radius={[8, 8, 0, 0]}
            maxBarSize={28}
            animationDuration={900}
          />

          <Bar
            dataKey="expense"
            fill="#ef4444"
            radius={[8, 8, 0, 0]}
            maxBarSize={28}
            animationDuration={900}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
