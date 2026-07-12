import { Pencil, Trash2, PiggyBank } from "lucide-react";
import GoalProgress from "./GoalProgress";

export default function GoalCard({ goal, onEdit, onDelete, onSaving }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-indigo-500">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{goal.title}</h2>

          <p className="mt-1 text-slate-400">
            Target ₹{goal.targetAmount.toLocaleString()}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onSaving(goal)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 hover:bg-green-700"
          >
            <PiggyBank size={18} />
          </button>

          <button
            onClick={() => onEdit(goal)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(goal)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 hover:bg-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <GoalProgress percentage={goal.percentage} />

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-slate-400">Saved</p>

          <p className="font-bold text-green-400">
            ₹{goal.savedAmount.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">Remaining</p>

          <p className="font-bold text-yellow-400">
            ₹{goal.remaining.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">Status</p>

          <p
            className={`font-bold ${
              goal.status === "Completed" ? "text-cyan-400" : "text-white"
            }`}
          >
            {goal.status}
          </p>
        </div>
      </div>
    </div>
  );
}
