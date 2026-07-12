import { useState } from "react";

import CalendarHeader from "../components/calendar/CalendarHeader";
import CalendarToolbar from "../components/calendar/CalendarToolbar";
import CalendarGrid from "../components/calendar/CalendarGrid";

import useCalendar from "../hooks/useCalendar";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState(new Date());

  const { events, loading } = useCalendar();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  if (loading) {
    return <p className="text-slate-400">Loading...</p>;
  }

  return (
    <div className="space-y-8">
      <CalendarHeader />

      <CalendarToolbar
        monthName={monthName}
        year={year}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />

      <p className="text-white text-lg">
        Selected: {selectedDate.toDateString()}
      </p>

      <CalendarGrid
        currentDate={currentDate}
        events={events}
        onSelectDate={setSelectedDate}
      />
    </div>
  );
}
