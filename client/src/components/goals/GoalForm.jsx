import { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

const colors = [
  "#6366F1",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#06B6D4",
  "#8B5CF6",
];

const icons = [
  "Target",
  "Laptop",
  "Car",
  "Home",
  "Plane",
  "Wallet",
  "Gift",
  "PiggyBank",
];

export default function GoalForm({ open, onClose, onSubmit, editingGoal }) {
  const [form, setForm] = useState({
    title: "",
    targetAmount: "",
    deadline: "",
    color: colors[0],
    icon: "Target",
  });

  useEffect(() => {
    if (editingGoal) {
      setForm({
        title: editingGoal.title,
        targetAmount: editingGoal.targetAmount,
        deadline: editingGoal.deadline?.split("T")[0],
        color: editingGoal.color,
        icon: editingGoal.icon,
      });
    } else {
      setForm({
        title: "",
        targetAmount: "",
        deadline: "",
        color: colors[0],
        icon: "Target",
      });
    }
  }, [editingGoal]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      return toast.error("Goal title is required");
    }

    if (!form.targetAmount) {
      return toast.error("Target amount is required");
    }

    onSubmit(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {editingGoal ? "Edit Goal" : "Create Goal"}
          </h2>

          <button onClick={onClose}>
            <X className="text-white" />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <input
            className="w-full rounded-xl bg-slate-800 p-4 text-white"
            placeholder="Goal Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />

          <input
            type="number"
            className="w-full rounded-xl bg-slate-800 p-4 text-white"
            placeholder="Target Amount"
            value={form.targetAmount}
            onChange={(e) =>
              setForm({
                ...form,
                targetAmount: e.target.value,
              })
            }
          />

          <input
            type="date"
            className="w-full rounded-xl bg-slate-800 p-4 text-white"
            value={form.deadline}
            onChange={(e) =>
              setForm({
                ...form,
                deadline: e.target.value,
              })
            }
          />

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
            {icons.map((icon) => (
              <option key={icon}>{icon}</option>
            ))}
          </select>

          <div>
            <p className="mb-3 text-white">Choose Color</p>

            <div className="flex gap-3 flex-wrap">
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
            {editingGoal ? "Update Goal" : "Create Goal"}
          </button>
        </form>
      </div>
    </div>
  );
}
