import { Bell } from "lucide-react";

export default function NotificationBell({ unreadCount = 0, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex h-11 w-11 items-center justify-center rounded-2xl border transition-all duration-300 ${
        unreadCount > 0
          ? "border-indigo-500 bg-slate-800"
          : "border-slate-800 bg-slate-900"
      }`}
    >
      <Bell
        size={22}
        className={`transition-all duration-300 ${
          unreadCount > 0 ? "text-indigo-400" : "text-slate-300"
        }`}
      />

      {unreadCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white shadow-lg">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </button>
  );
}
