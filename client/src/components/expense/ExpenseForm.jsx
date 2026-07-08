import {
  IndianRupee,
  CalendarDays,
  FileText,
  Tag,
  CreditCard,
} from "lucide-react";

export default function ExpenseForm({
  form,
  setForm,
  handleSubmit,
  editingId,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-8 shadow-xl"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          {editingId ? "Update Expense" : "Add New Expense"}
        </h2>

        <p className="text-slate-400 mt-2">Fill all expense details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          icon={<FileText size={18} />}
          placeholder="Title"
          value={form.title}
          onChange={(v) => setForm({ ...form, title: v })}
        />

        <Input
          type="number"
          icon={<IndianRupee size={18} />}
          placeholder="Amount"
          value={form.amount}
          onChange={(v) => setForm({ ...form, amount: v })}
        />

        <Input
          icon={<Tag size={18} />}
          placeholder="Category"
          value={form.category}
          onChange={(v) => setForm({ ...form, category: v })}
        />

        <Input
          icon={<CreditCard size={18} />}
          placeholder="Payment Method"
          value={form.paymentMethod}
          onChange={(v) => setForm({ ...form, paymentMethod: v })}
        />

        <Input
          type="date"
          icon={<CalendarDays size={18} />}
          value={form.date}
          onChange={(v) => setForm({ ...form, date: v })}
        />
      </div>

      <textarea
        rows={4}
        placeholder="Note..."
        value={form.note}
        onChange={(e) => setForm({ ...form, note: e.target.value })}
        className="w-full mt-5 bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none"
      />

      <button className="mt-6 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl transition">
        {editingId ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
}

function Input({ icon, type = "text", placeholder, value, onChange }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
        {icon}
      </div>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
  );
}
