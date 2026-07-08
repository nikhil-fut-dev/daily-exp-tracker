import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function MonthlyChart({ data }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Monthly Overview</h2>

          <p className="text-slate-400 text-sm mt-1">
            Income vs Expense Comparison
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid stroke="#334155" strokeDasharray="4 4" />

          <XAxis dataKey="month" stroke="#94a3b8" />

          <YAxis stroke="#94a3b8" />

          <Tooltip
            contentStyle={{
              background: "#1e293b",
              border: "none",
              borderRadius: "15px",
              color: "#fff",
            }}
          />

          <Bar dataKey="income" radius={[8, 8, 0, 0]} fill="#22c55e" />

          <Bar dataKey="expense" radius={[8, 8, 0, 0]} fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
