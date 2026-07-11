import { Pencil, Trash2 } from "lucide-react";
import BudgetProgress from "./BudgetProgress";

export default function BudgetCard({ budget, onEdit, onDelete }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-indigo-500 transition">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-white">{budget.category}</h2>

          <p className="text-slate-400 mt-1">
            Budget ₹{budget.limit.toLocaleString()}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(budget)}
            className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-indigo-600 flex items-center justify-center"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(budget)}
            className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-red-600 flex items-center justify-center"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <BudgetProgress percentage={budget.percentage} status={budget.status} />

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div>
          <p className="text-slate-400 text-sm">Spent</p>

          <p className="text-red-400 font-bold">
            ₹{budget.spent.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Remaining</p>

          <p className="text-green-400 font-bold">
            ₹{budget.remaining.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Status</p>

          <p className="text-white font-bold capitalize">{budget.status}</p>
        </div>
      </div>
    </div>
  );
}
