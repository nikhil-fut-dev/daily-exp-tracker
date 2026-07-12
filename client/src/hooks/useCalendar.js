import { useEffect, useState } from "react";
import { getCalendarData } from "../api/calendarApi";

export default function useCalendar() {
  const [events, setEvents] = useState({
    income: [],
    expense: [],
    goals: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchCalendar = async () => {
    try {
      setLoading(true);

      const data = await getCalendarData();

      setEvents({
        income: data.income || [],
        expense: data.expense || [],
        goals: data.goals || [],
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendar();
  }, []);

  return {
    events,
    loading,
    fetchCalendar,
  };
}
