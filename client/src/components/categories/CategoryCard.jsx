import { Pencil, Trash2 } from "lucide-react";
import * as Icons from "lucide-react";

export default function CategoryCard({ category, onEdit, onDelete }) {
  const Icon = Icons[category.icon] || Icons.Folder;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-indigo-500 transition-all">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              backgroundColor: category.color,
            }}
          >
            <Icon className="text-white" size={26} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">{category.name}</h2>

            <p className="text-slate-400">{category.type}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(category)}
            className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-indigo-600 flex items-center justify-center"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(category)}
            className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-red-600 flex items-center justify-center"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
