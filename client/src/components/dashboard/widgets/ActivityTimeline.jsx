import TimelineItem from "./TimelineItem";

export default function ActivityTimeline({ dashboard }) {
  const timeline = [
    ...dashboard.incomes.map((item) => ({
      type: "income",
      title: item.title,
      date: item.date,
      message: `Income ₹${Number(item.amount).toLocaleString()}`,
    })),

    ...dashboard.expenses.map((item) => ({
      type: "expense",
      title: item.title,
      date: item.date,
      message: `Expense ₹${Number(item.amount).toLocaleString()}`,
    })),

    ...dashboard.goals.map((item) => ({
      type: "goal",
      title: item.title,
      date: item.createdAt,
      message: "Goal Created",
    })),

    ...dashboard.budgets.map((item) => ({
      type: "budget",
      title: item.category,
      date: item.createdAt,
      message: `Budget ₹${Number(item.limit).toLocaleString()}`,
    })),

    ...dashboard.bills.map((item) => ({
      type: "bill",
      title: item.title,
      date: item.dueDate,
      message: `Bill ₹${Number(item.amount).toLocaleString()}`,
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 12);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Activity Timeline</h2>

        <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs text-indigo-400">
          {timeline.length} Activities
        </span>
      </div>

      <div className="space-y-5">
        {timeline.map((item, index) => (
          <TimelineItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
