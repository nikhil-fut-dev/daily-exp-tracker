import { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

export default function BudgetForm({ open, onClose, onSubmit, editingBudget }) {
  const [form, setForm] = useState({
    category: "",
    limit: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    if (editingBudget) {
      setForm({
        category: editingBudget.category,
        limit: editingBudget.limit,
        month: editingBudget.month,
        year: editingBudget.year,
      });
    }
  }, [editingBudget]);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.category || !form.limit) {
      return toast.error("Please fill all fields");
    }

    await onSubmit(form);

    if (!editingBudget) {
      setForm({
        category: "",
        limit: "",
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-3xl w-full max-w-lg p-8 border border-slate-800">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">
            {editingBudget ? "Edit Budget" : "Add Budget"}
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <input
            placeholder="Category"
            className="w-full bg-slate-800 rounded-xl p-4"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Budget Limit"
            className="w-full bg-slate-800 rounded-xl p-4"
            value={form.limit}
            onChange={(e) =>
              setForm({
                ...form,
                limit: e.target.value,
              })
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              className="bg-slate-800 rounded-xl p-4"
              value={form.month}
              onChange={(e) =>
                setForm({
                  ...form,
                  month: Number(e.target.value),
                })
              }
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <input
              type="number"
              className="bg-slate-800 rounded-xl p-4"
              value={form.year}
              onChange={(e) =>
                setForm({
                  ...form,
                  year: Number(e.target.value),
                })
              }
            />
          </div>

          <button className="w-full bg-indigo-600 py-4 rounded-xl">
            {editingBudget ? "Update Budget" : "Create Budget"}
          </button>
        </form>
      </div>
    </div>
  );
}
