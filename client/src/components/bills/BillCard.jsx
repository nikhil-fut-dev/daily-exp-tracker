import {
  Pencil,
  Trash2,
  CalendarDays,
  IndianRupee,
  Repeat,
  Receipt,
  CalendarClock,
  CircleCheckBig,
  TriangleAlert,
} from "lucide-react";

export default function BillCard({ bill, onEdit, onDelete }) {
  const dueDate = new Date(bill.dueDate);

  const isOverdue = bill.status !== "Paid" && dueDate < new Date();

  const getDueStatus = () => {
    if (bill.status === "Paid") {
      return {
        text: "Due Today",
        icon: CircleCheckBig,
        className: "bg-orange-500/20 text-orange-400",
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(bill.dueDate);
    due.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        text: `${Math.abs(diffDays)} Day${Math.abs(diffDays) > 1 ? "s" : ""} Overdue`,
        icon: TriangleAlert,
        className: "bg-red-500/20 text-red-400",
      };
    }

    if (diffDays === 0) {
      return {
        text: "Due Today",
        icon: CalendarClock,
        className: "bg-orange-500/20 text-orange-400",
      };
    }

    if (diffDays === 1) {
      return {
        text: "Due Tomorrow",
        icon: CalendarClock,
        className: "bg-yellow-500/20 text-yellow-400",
      };
    }

    return {
      text: `${diffDays} Days Left`,
      icon: CalendarClock,
      className: "bg-cyan-500/20 text-cyan-400",
    };
  };

  const dueStatus = getDueStatus();

  const Icon = dueStatus.icon;

  return (
    <div
      className={`rounded-3xl border p-6 transition-all
      ${
        isOverdue
          ? "border-red-500 bg-red-500/5"
          : "border-slate-800 bg-slate-900 hover:border-indigo-500"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className="rounded-2xl bg-indigo-500/10 p-4">
            <Receipt size={28} className="text-indigo-400" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">{bill.title}</h2>

            <p className="mt-1 text-slate-400">{bill.category}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(bill)}
            className="rounded-xl bg-blue-600 p-3 hover:bg-blue-700"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(bill)}
            className="rounded-xl bg-red-600 p-3 hover:bg-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-slate-800 p-4">
          <div className="flex items-center gap-2 text-slate-400">
            <IndianRupee size={16} />
            Amount
          </div>

          <h3 className="mt-2 text-2xl font-bold text-green-400">
            ₹{bill.amount}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-4">
          <div className="flex items-center gap-2 text-slate-400">
            <CalendarDays size={16} />
            Due Date
          </div>

          <h3 className="mt-2 text-white">{dueDate.toLocaleDateString()}</h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Repeat size={16} />
            Frequency
          </div>

          <h3 className="mt-2 text-cyan-400">{bill.frequency}</h3>
        </div>
      </div>

      <div className="mt-5 flex justify-between items-center">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${dueStatus.className}`}
        >
          <Icon size={16} />
          {dueStatus.text}
        </span>

        {bill.note && <p className="text-slate-400 text-sm">{bill.note}</p>}
      </div>
    </div>
  );
}
