import { CalendarDays } from "lucide-react";

export default function DashboardHeader() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
        ? "Good Afternoon"
        : "Good Evening";

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
      <div>
        <h1 className="text-4xl font-bold text-white">{greeting}</h1>

        <p className="text-slate-400 mt-2">
          Welcome back to your Expense Tracker Dashboard.
        </p>
      </div>

      <div className="mt-5 lg:mt-0 bg-slate-900 border border-slate-800 rounded-2xl px-5 py-3 flex items-center gap-3">
        <CalendarDays size={20} className="text-indigo-400" />

        <span className="text-slate-300">{new Date().toDateString()}</span>
      </div>
    </div>
  );
}
