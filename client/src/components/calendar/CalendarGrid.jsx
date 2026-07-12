import { useMemo } from "react";
import CalendarCell from "./CalendarCell";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarGrid({ currentDate, events, onSelectDate }) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const today = new Date();

  const getEventsForDay = (day) => {
    if (!day) return [];

    const current = new Date(year, month, day).toDateString();

    const list = [];

    (events?.income || []).forEach((item) => {
      if (item.date && new Date(item.date).toDateString() === current) {
        list.push({
          type: "income",
          title: item.title,
        });
      }
    });

    (events?.expense || []).forEach((item) => {
      if (item.date && new Date(item.date).toDateString() === current) {
        list.push({
          type: "expense",
          title: item.title,
        });
      }
    });

    (events?.goals || []).forEach((item) => {
      if (item.deadline && new Date(item.deadline).toDateString() === current) {
        list.push({
          type: "goal",
          title: item.title,
        });
      }
    });

    return list;
  };

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();

    const totalDays = new Date(year, month + 1, 0).getDate();

    const cells = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push(null);
    }

    for (let d = 1; d <= totalDays; d++) {
      cells.push(d);
    }

    while (cells.length < 42) {
      cells.push(null);
    }

    return cells;
  }, [year, month]);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
      <div className="mb-5 grid grid-cols-7 gap-3">
        {weekDays.map((day) => (
          <div key={day} className="text-center font-semibold text-slate-400">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-3">
        {days.map((day, index) => (
          <CalendarCell
            key={index}
            day={day}
            events={getEventsForDay(day)}
            isToday={
              day &&
              today.getDate() === day &&
              today.getMonth() === month &&
              today.getFullYear() === year
            }
            onClick={() => {
              if (day) {
                onSelectDate(new Date(year, month, day));
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
