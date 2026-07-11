import { Menu } from "lucide-react";

export default function NavbarLeft({ onMenuClick }) {
  return (
    <div className="flex items-center gap-4">
      <button onClick={onMenuClick} className="lg:hidden text-slate-300">
        <Menu size={24} />
      </button>

      <div>
        <h1 className="text-xl md:text-2xl font-bold text-white">
          Welcome Back 👋
        </h1>

        <p className="hidden md:block text-sm text-slate-400">
          Here's your financial overview
        </p>
      </div>
    </div>
  );
}
