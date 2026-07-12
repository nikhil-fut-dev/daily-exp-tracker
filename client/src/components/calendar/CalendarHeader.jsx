import { CalendarDays } from "lucide-react";

export default function CalendarHeader() {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 p-8 shadow-xl">
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
          <CalendarDays size={34} className="text-white" />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-white">Financial Calendar</h1>

          <p className="mt-2 text-indigo-100">
            Track Income, Expenses and Goals in one place.
          </p>
        </div>
      </div>
    </div>
  );
}
