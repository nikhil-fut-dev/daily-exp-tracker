import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = [
  "#6366F1",
  "#3B82F6",
  "#22C55E",
  "#FBBF24",
  "#F97316",
  "#EC4899",
  "#06B6D4",
];

export default function ExpensePieChart({ dashboard }) {
  const categoryMap = {};

  dashboard.expenses.forEach((item) => {
    const category =
      item.category?.trim().toLowerCase().replace(/\s+/g, " ") || "other";

    const name = category.charAt(0).toUpperCase() + category.slice(1);

    categoryMap[name] = (categoryMap[name] || 0) + Number(item.amount || 0);
  });

  let data = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  data.sort((a, b) => b.value - a.value);

  // if (data.length > 6) {
  //   const top = data.slice(0, 6);

  //   const others = data.slice(6).reduce((sum, item) => sum + item.value, 0);

  //   data = [
  //     ...top,
  //     {
  //       name: "Others",
  //       value: others,
  //     },
  //   ];
  // }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      className="
        col-span-12
        xl:col-span-4
        rounded-3xl
        border border-slate-800
        bg-slate-900/70
        p-5
        shadow-xl
      "
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Expense Overview</h2>

          <p className="mt-1 text-xs text-slate-400">Category-wise expenses</p>
        </div>

        <button className="rounded-xl border border-slate-700 px-3 py-2 text-xs text-slate-300">
          This Month
        </button>
      </div>

      {/* Chart */}
      <div className="relative mx-auto h-[210px] w-full max-w-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={60}
              outerRadius={92}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((item, index) => (
                <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold text-white">
            ₹{total.toLocaleString("en-IN")}
          </h2>

          <p className="text-[11px] text-slate-400">Total Expenses</p>
        </div>
      </div>

      {/* Compact Category List */}
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
        {data.map((item, index) => {
          const percent =
            total > 0 ? ((item.value / total) * 100).toFixed(0) : 0;

          return (
            <div
              key={item.name}
              className="flex min-w-0 items-center justify-between"
            >
              {/* Category */}
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />

                <span className="truncate text-xs text-slate-400">
                  {item.name}
                </span>
              </div>

              {/* Amount + Percentage */}
              <div className="ml-2 flex shrink-0 items-center gap-2">
                <span className="text-xs font-semibold text-white">
                  ₹{Number(item.value).toLocaleString("en-IN")}
                </span>

                <span className="text-xs text-slate-500">{percent}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
