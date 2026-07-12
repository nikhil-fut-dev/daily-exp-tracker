import { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

export default function AddSavingModal({ open, onClose, onSubmit, goal }) {
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (open) {
      setAmount("");
    }
  }, [open]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      return toast.error("Enter a valid amount");
    }

    onSubmit(Number(amount));

    setAmount("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Add Saving</h2>

          <button onClick={onClose}>
            <X className="text-white" />
          </button>
        </div>

        <div className="mb-6 rounded-2xl bg-slate-800 p-4">
          <p className="text-lg font-semibold text-white">{goal?.title}</p>

          <p className="mt-2 text-slate-400">
            Saved ₹{goal?.savedAmount?.toLocaleString()} / ₹
            {goal?.targetAmount?.toLocaleString()}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <input
            type="number"
            placeholder="Enter Saving Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl bg-slate-800 p-4 text-white"
          />

          <button className="w-full rounded-xl bg-green-600 py-4 font-semibold text-white hover:bg-green-700">
            Add Saving
          </button>
        </form>
      </div>
    </div>
  );
}
