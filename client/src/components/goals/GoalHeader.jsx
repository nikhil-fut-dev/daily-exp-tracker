import { Target, Plus } from "lucide-react";

export default function GoalHeader({ onAdd }) {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-4xl font-bold text-white">
            <Target size={36} />
            Savings Goals
          </h1>

          <p className="mt-2 text-indigo-100">
            Track your savings goals and achieve your financial targets.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:scale-105"
        >
          <Plus size={20} />
          Add Goal
        </button>
      </div>
    </div>
  );
}
