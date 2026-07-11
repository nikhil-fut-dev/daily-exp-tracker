import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function IncomeExpenseChart({ report }) {
  const data = [
    {
      name: "Income",
      amount: report?.totalIncome || 0,
    },
    {
      name: "Expense",
      amount: report?.totalExpense || 0,
    },
    {
      name: "Savings",
      amount: report?.savings || 0,
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">Income vs Expense</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

          <XAxis dataKey="name" stroke="#94A3B8" />

          <YAxis stroke="#94A3B8" />

          <Tooltip />

          <Bar dataKey="amount" radius={[10, 10, 0, 0]} fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
