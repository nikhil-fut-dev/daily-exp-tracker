import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = [
  "#6366f1",
  "#22c55e",
  "#ef4444",
  "#f59e0b",
  "#06b6d4",
  "#8b5cf6",
];

export default function CategoryChart({ data }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-6">Expense Categories</h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            innerRadius={60}
            paddingAngle={3}
          >
            {data.map((item, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              background: "#1e293b",
              border: "none",
              borderRadius: "15px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
