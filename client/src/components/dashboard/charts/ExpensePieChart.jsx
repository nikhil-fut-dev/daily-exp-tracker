import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

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
      item.category
        ?.trim()
        .toLowerCase()
        .replace(/\s+/g, " ") || "other";

    const name =
      category.charAt(0).toUpperCase() + category.slice(1);

    categoryMap[name] =
      (categoryMap[name] || 0) + Number(item.amount);
  });

  let data = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  data.sort((a, b) => b.value - a.value);

  if (data.length > 6) {
    const top = data.slice(0, 6);

    const others = data
      .slice(6)
      .reduce((sum, item) => sum + item.value, 0);

    data = [
      ...top,
      {
        name: "Others",
        value: others,
      },
    ];
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="col-span-12 xl:col-span-4 rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6 shadow-xl">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-xl font-bold text-white">
            Expense Overview
          </h2>

          <p className="text-slate-400 text-sm">
            Category-wise expenses
          </p>
        </div>

        <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300">
          This Month
        </button>

      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8">

        <div className="relative h-[260px] w-[260px]">

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={75}
                outerRadius={110}
                paddingAngle={2}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <h2 className="text-3xl font-bold text-white">
              ₹{total.toLocaleString()}
            </h2>

            <p className="text-slate-400">
              Total Expenses
            </p>

          </div>

        </div>

        <div className="flex-1 space-y-4">

          {data.map((item, index) => {

            const percent =
              ((item.value / total) * 100).toFixed(0);

            return (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">

                  <span
                    className="h-4 w-4 rounded-full"
                    style={{
                      background:
                        COLORS[index % COLORS.length],
                    }}
                  />

                  <span className="text-slate-300">
                    {item.name}
                  </span>

                </div>

                <div className="flex gap-6">

                  <span className="font-semibold text-white">
                    ₹{item.value.toLocaleString()}
                  </span>

                  <span className="w-10 text-right text-slate-400">
                    {percent}%
                  </span>

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}