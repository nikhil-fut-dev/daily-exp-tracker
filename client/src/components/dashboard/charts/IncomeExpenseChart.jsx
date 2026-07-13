import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function IncomeExpenseChart({ dashboard }) {
  const monthlyData = Array.from({ length: 12 }, (_, index) => {
    const month = index;

    const income = dashboard.incomes
      .filter((item) => new Date(item.date).getMonth() === month)
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const expense = dashboard.expenses
      .filter((item) => new Date(item.date).getMonth() === month)
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

    return {
      month: new Date(2025, month).toLocaleString("default", {
        month: "short",
      }),
      Income: income,
      Expense: expense,
    };
  });

  return (
    <div className="col-span-12 xl:col-span-8 rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6 shadow-xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Income vs Expense</h2>

        <p className="text-slate-400 mt-1 text-sm">
          Monthly financial overview
        </p>
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />

            <XAxis dataKey="month" stroke="#94a3b8" />

            <YAxis stroke="#94a3b8" />

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Legend />

            <Area
              type="monotone"
              dataKey="Income"
              stroke="#22c55e"
              fill="url(#income)"
              strokeWidth={3}
            />

            <Area
              type="monotone"
              dataKey="Expense"
              stroke="#ef4444"
              fill="url(#expense)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
