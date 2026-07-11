import { Moon } from "lucide-react";

export default function ThemeToggle() {
  return (
    <button
      className="
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
      <Moon size={20} className="text-slate-300" />
    </button>
  );
}
