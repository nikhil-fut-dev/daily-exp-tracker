import { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import useLockBodyScroll from "../../hooks/useLockBodyScroll";

const colors = [
  "#6366F1",
  "#10B981",
  "#EF4444",
  "#F59E0B",
  "#06B6D4",
  "#8B5CF6",
];

export default function CategoryForm({
  open,
  onClose,
  onSubmit,
  editingCategory,
}) {
  const [form, setForm] = useState({
    name: "",
    type: "Expense",
    icon: "Folder",
    color: colors[0],
  });

  useLockBodyScroll(open);

  useEffect(() => {
    if (editingCategory) {
      setForm({
        name: editingCategory.name,
        type: editingCategory.type,
        icon: editingCategory.icon,
        color: editingCategory.color,
      });
    } else {
      setForm({
        name: "",
        type: "Expense",
        icon: "Folder",
        color: colors[0],
      });
    }
  }, [editingCategory]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      return toast.error("Category name is required");
    }

    onSubmit(form);

    setForm({
      name: "",
      type: "Expense",
      icon: "Folder",
      color: colors[0],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {editingCategory ? "Edit Category" : "Add Category"}
          </h2>

          <button onClick={onClose}>
            <X className="text-white" />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <input
            className="w-full rounded-xl bg-slate-800 p-4 text-white"
            placeholder="Category Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <select
            className="w-full rounded-xl bg-slate-800 p-4 text-white"
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,
                type: e.target.value,
              })
            }
          >
            <option>Expense</option>
            <option>Income</option>
          </select>

          <select
            className="w-full rounded-xl bg-slate-800 p-4 text-white"
            value={form.icon}
            onChange={(e) =>
              setForm({
                ...form,
                icon: e.target.value,
              })
            }
          >
            <option>Folder</option>
            <option>Utensils</option>
            <option>ShoppingBag</option>
            <option>Car</option>
            <option>Briefcase</option>
            <option>Wallet</option>
            <option>HeartPulse</option>
            <option>Gamepad2</option>
            <option>GraduationCap</option>
            <option>Plane</option>
          </select>

          <div>
            <p className="mb-3 text-white">Choose Color</p>

            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      color,
                    })
                  }
                  className={`h-10 w-10 rounded-full border-4 ${
                    form.color === color ? "border-white" : "border-transparent"
                  }`}
                  style={{
                    backgroundColor: color,
                  }}
                />
              ))}
            </div>
          </div>

          <button className="w-full rounded-xl bg-indigo-600 py-4 font-semibold text-white hover:bg-indigo-700">
            {editingCategory ? "Update Category" : "Create Category"}
          </button>
        </form>
      </div>
    </div>
  );
}
