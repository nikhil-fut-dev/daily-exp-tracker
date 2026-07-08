import { Bell, Search, Menu, Moon } from "lucide-react";
import UserDropdown from "./UserDropdown";

export default function Navbar({ onMenuClick, onSettings }) {
  return (
    <header className="sticky top-0 z-30 h-16 sm:h-20 bg-slate-900/70 backdrop-blur-lg border-b border-slate-800 flex items-center justify-between px-3 sm:px-6">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden text-slate-300">
          <Menu size={24} />
        </button>

        <div className="min-w-0">
          <h1 className="text-lg sm:text-2xl font-bold text-white truncate">
            Welcome Back 👋
          </h1>

          <p className="hidden sm:block text-sm text-slate-400 truncate">
            Here's your financial overview
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-slate-800 rounded-xl px-4 py-2 w-80">
          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-3 text-white w-full placeholder:text-slate-500"
          />
        </div>

        <button className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition">
          <Bell size={20} />
        </button>

        <button className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition">
          <Moon size={20} />
        </button>

        <UserDropdown onSettings={onSettings} />
      </div>
    </header>
  );
}
