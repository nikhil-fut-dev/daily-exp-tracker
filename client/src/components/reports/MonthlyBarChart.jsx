import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

export default function MonthlyBarChart({ report }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Monthly Analytics</h2>

      <ResponsiveContainer width="100%" height={380}>
        <BarChart data={report?.monthlyData || []}>
          <CartesianGrid stroke="#334155" strokeDasharray="3 3" />

          <XAxis dataKey="month" stroke="#94A3B8" />

          <YAxis stroke="#94A3B8" />

          <Tooltip />

          <Legend />

          <Bar dataKey="income" fill="#10B981" radius={[8, 8, 0, 0]} />

          <Bar dataKey="expense" fill="#EF4444" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
