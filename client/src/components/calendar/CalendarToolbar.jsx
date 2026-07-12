import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarToolbar({
  monthName,
  year,
  prevMonth,
  nextMonth,
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <button
        onClick={prevMonth}
        className="rounded-xl bg-slate-800 p-3 transition hover:bg-indigo-600"
      >
        <ChevronLeft />
      </button>

      <h2 className="text-2xl font-bold text-white">
        {monthName} {year}
      </h2>

      <button
        onClick={nextMonth}
        className="rounded-xl bg-slate-800 p-3 transition hover:bg-indigo-600"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
