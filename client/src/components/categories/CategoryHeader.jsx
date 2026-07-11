import { FolderTree, Plus } from "lucide-react";

export default function CategoryHeader({ onAdd }) {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-4xl font-bold text-white">
            <FolderTree size={38} />
            Categories
          </h1>

          <p className="mt-2 text-indigo-100">
            Manage your income and expense categories.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-indigo-600 transition hover:scale-105"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>
    </div>
  );
}
