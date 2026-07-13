import { CalendarDays } from "lucide-react";

export default function DashboardHeader() {
  const now = new Date();

  const greeting =
    now.getHours() < 12
      ? "Good Morning"
      : now.getHours() < 18
        ? "Good Afternoon"
        : "Good Evening";

  const date = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm text-indigo-400 font-medium">
          Dashboard Overview
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white">{greeting}</h1>

        <p className="mt-2 text-slate-400">
          Welcome back. Here's what's happening with your finances today.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4">
        <CalendarDays className="text-indigo-400" size={20} />

        <div>
          <p className="text-xs text-slate-400">Today</p>

          <h3 className="font-semibold text-white">{date}</h3>
        </div>
      </div>
    </div>
  );
}
