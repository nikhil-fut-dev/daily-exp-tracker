import { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

export default function BillForm({ open, onClose, onSubmit, editingBill }) {
  const initialState = {
    title: "",
    amount: "",
    category: "",
    dueDate: "",
    repeat: "Monthly",
    status: "Pending",
    note: "",
  };

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingBill) {
      setForm({
        title: editingBill.title || "",
        amount: editingBill.amount || "",
        category: editingBill.category || "",
        dueDate: editingBill.dueDate ? editingBill.dueDate.split("T")[0] : "",
        repeat: editingBill.repeat || "Monthly",
        status: editingBill.status || "Pending",
        note: editingBill.note || "",
      });
    } else {
      setForm(initialState);
    }
  }, [editingBill]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      return toast.error("Bill title is required");
    }

    if (!form.amount) {
      return toast.error("Amount is required");
    }

    if (!form.dueDate) {
      return toast.error("Due Date is required");
    }

    onSubmit(form);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {editingBill ? "Edit Bill" : "Add New Bill"}
          </h2>

          <button onClick={onClose}>
            <X className="text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            className="w-full rounded-xl bg-slate-800 p-4 text-white"
            placeholder="Bill Title"
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
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount: e.target.value,
              })
            }
          />

          <input
            className="w-full rounded-xl bg-slate-800 p-4 text-white"
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
          />

          <input
            type="date"
            className="w-full rounded-xl bg-slate-800 p-4 text-white"
            value={form.dueDate}
            onChange={(e) =>
              setForm({
                ...form,
                dueDate: e.target.value,
              })
            }
          />

          <select
            className="w-full rounded-xl bg-slate-800 p-4 text-white"
            value={form.repeat}
            onChange={(e) =>
              setForm({
                ...form,
                repeat: e.target.value,
              })
            }
          >
            <option>One Time</option>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </select>

          <select
            className="w-full rounded-xl bg-slate-800 p-4 text-white"
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value,
              })
            }
          >
            <option>Pending</option>
            <option>Paid</option>
          </select>

          <textarea
            rows={4}
            className="w-full rounded-xl bg-slate-800 p-4 text-white"
            placeholder="Notes"
            value={form.note}
            onChange={(e) =>
              setForm({
                ...form,
                note: e.target.value,
              })
            }
          />

          <button className="w-full rounded-xl bg-indigo-600 py-4 font-semibold text-white hover:bg-indigo-700 transition">
            {editingBill ? "Update Bill" : "Create Bill"}
          </button>
        </form>
      </div>
    </div>
  );
}
