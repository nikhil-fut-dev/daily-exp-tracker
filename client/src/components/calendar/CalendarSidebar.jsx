export default function CalendarSidebar({ events = {}, selectedDate }) {
  const income = events?.income || [];
  const expense = events?.expense || [];
  const goals = events?.goals || [];

  const date = selectedDate ? new Date(selectedDate).toDateString() : "";

  const list = [
    ...income
      .filter((i) => i.date && new Date(i.date).toDateString() === date)
      .map((i) => ({
        type: "Income",
        title: i.title,
      })),

    ...expense
      .filter((e) => e.date && new Date(e.date).toDateString() === date)
      .map((e) => ({
        type: "Expense",
        title: e.title,
      })),

    ...goals
      .filter(
        (g) => g.targetDate && new Date(g.targetDate).toDateString() === date,
      )
      .map((g) => ({
        type: "Goal",
        title: g.title,
      })),
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-bold text-white">
        {selectedDate ? new Date(selectedDate).toDateString() : "Select Date"}
      </h2>

      {list.length === 0 ? (
        <p className="text-slate-400">No Events</p>
      ) : (
        <div className="space-y-3">
          {list.map((item, index) => (
            <div key={index} className="rounded-xl bg-slate-800 p-4">
              <p className="font-semibold text-white">{item.title}</p>

              <p className="text-sm text-slate-400">{item.type}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
