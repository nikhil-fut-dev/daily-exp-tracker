import { Bell } from "lucide-react";

export default function NotificationDropdown() {
  return (
    <button
      className="
      relative
      w-11
      h-11
      rounded-xl
      bg-slate-800
      hover:bg-slate-700
      flex
      items-center
      justify-center
      transition-all
      duration-300
    "
    >
      <Bell size={20} className="text-slate-300" />

      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
    </button>
  );
}
