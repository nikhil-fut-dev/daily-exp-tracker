import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="hidden lg:flex items-center bg-slate-800 rounded-xl px-4 py-2 w-80 border border-slate-700 focus-within:border-indigo-500 transition">
      <Search size={18} className="text-slate-400" />

      <input
        type="text"
        placeholder="Search anything..."
        className="bg-transparent outline-none ml-3 text-white w-full placeholder:text-slate-500"
      />
    </div>
  );
}
