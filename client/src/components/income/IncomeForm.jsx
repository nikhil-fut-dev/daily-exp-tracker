import { IndianRupee, CalendarDays, FileText, Tag } from "lucide-react";

export default function IncomeForm({ form, setForm, handleSubmit, editingId }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 mb-8 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {editingId ? "Update Income" : "Add New Income"}
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Fill in the details below.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {/* Title */}

        <div>
          <label className="text-slate-300 text-sm mb-2 block">Title</label>

          <div className="relative">
            <FileText
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Salary"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-sm sm:text-base text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Amount */}

        <div>
          <label className="text-slate-300 text-sm mb-2 block">Amount</label>

          <div className="relative">
            <IndianRupee
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="number"
              placeholder="50000"
              value={form.amount}
              onChange={(e) =>
                setForm({
                  ...form,
                  amount: e.target.value,
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-sm sm:text-base text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Category */}

        <div>
          <label className="text-slate-300 text-sm mb-2 block">Category</label>

          <div className="relative">
            <Tag
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Salary / Freelance"
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-sm sm:text-base text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Date */}

        <div>
          <label className="text-slate-300 text-sm mb-2 block">Date</label>

          <div className="relative">
            <CalendarDays
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({
                  ...form,
                  date: e.target.value,
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-sm sm:text-base text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Note */}

      <div className="mt-5">
        <label className="text-slate-300 text-sm mb-2 block">Note</label>

        <textarea
          rows={4}
          placeholder="Write something..."
          value={form.note}
          onChange={(e) =>
            setForm({
              ...form,
              note: e.target.value,
            })
          }
          className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm sm:text-base text-white resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Button */}

      <div className="mt-6">
        <button
          type="submit"
          className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 px-6 sm:px-8 py-3 rounded-xl text-white font-semibold"
        >
          {editingId ? "Update Income" : "Add Income"}
        </button>
      </div>
    </form>
  );
}
