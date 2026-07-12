export default function CalendarCell({ day, isToday, events = [], onClick }) {
  return (
    <div
      onClick={onClick}
      className={`aspect-square rounded-2xl border p-3 transition-all duration-200
      ${
        day
          ? "border-slate-800 bg-slate-900 hover:border-indigo-500 hover:-translate-y-1 cursor-pointer"
          : "border-transparent"
      }`}
    >
      {day && (
        <>
          <div
            className={`text-lg font-semibold ${
              isToday ? "text-indigo-400" : "text-white"
            }`}
          >
            {day}
          </div>

          <div className="mt-3 flex flex-wrap gap-1">
            {events.slice(0, 4).map((event, index) => (
              <span
                key={index}
                className={`h-2 w-2 rounded-full ${
                  event.type === "income"
                    ? "bg-green-500"
                    : event.type === "expense"
                      ? "bg-red-500"
                      : "bg-yellow-400"
                }`}
              />
            ))}

            {events.length > 4 && (
              <span className="text-[10px] text-slate-400">
                +{events.length - 4}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
