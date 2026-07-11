import { Pencil, Trash2, CalendarDays, Tag, IndianRupee } from "lucide-react";

export default function IncomeTable({
  records,
  handleDelete,
  setEditingId,
  setForm,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="text-left px-6 py-4 text-slate-300">Title</th>

              <th className="text-left px-6 py-4 text-slate-300">Amount</th>

              <th className="text-left px-6 py-4 text-slate-300">Category</th>

              <th className="text-left px-6 py-4 text-slate-300">Date</th>

              <th className="text-center px-6 py-4 text-slate-300">Action</th>
            </tr>
          </thead>

          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-12 text-slate-500">
                  No Income Found
                </td>
              </tr>
            ) : (
              records.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-slate-800 hover:bg-slate-800/60 transition"
                >
                  {/* Title */}

                  <td className="px-6 py-5">
                    <div className="font-semibold text-white">{item.title}</div>
                  </td>

                  {/* Amount */}

                  <td className="px-6 py-5">
                    <div className="inline-flex items-center gap-2 bg-green-600/20 text-green-400 px-3 py-1 rounded-full">
                      <IndianRupee size={16} />

                      {item.amount}
                    </div>
                  </td>

                  {/* Category */}

                  <td className="px-6 py-5">
                    <div className="inline-flex items-center gap-2 bg-indigo-600/20 text-indigo-300 px-3 py-1 rounded-full">
                      <Tag size={15} />

                      {item.category}
                    </div>
                  </td>

                  {/* Date */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-slate-300">
                      <CalendarDays size={16} />

                      {new Date(item.date).toLocaleDateString()}
                    </div>
                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setEditingId(item._id);

                          setForm({
                            title: item.title,
                            amount: item.amount,
                            category: item.category,
                            note: item.note || "",
                            date: item.date?.split("T")[0],
                          });
                        }}
                        className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition"
                      >
                        <Pencil size={18} className="text-white" />
                      </button>

                      <button
                        onClick={() => handleDelete(item._id, item.title)}
                        className="w-10 h-10 rounded-xl bg-red-600 hover:bg-red-700 flex items-center justify-center transition"
                      >
                        <Trash2 size={18} className="text-white" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Mobile View */}
      <div className="block lg:hidden p-4 space-y-4">
        {records.length === 0 ? (
          <div className="text-center text-slate-400 py-8">No Income Found</div>
        ) : (
          records.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl border border-slate-800 bg-slate-800 p-4"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-white text-lg">
                  {item.title}
                </h3>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(item._id);

                      setForm({
                        title: item.title,
                        amount: item.amount,
                        category: item.category,
                        note: item.note || "",
                        date: item.date?.split("T")[0],
                      });
                    }}
                    className="w-9 h-9 rounded-lg bg-blue-600 flex justify-center items-center"
                  >
                    <Pencil size={16} className="text-white" />
                  </button>

                  <button
                    onClick={() => handleDelete(item._id, item.title)}
                    className="w-9 h-9 rounded-lg bg-red-600 flex justify-center items-center"
                  >
                    <Trash2 size={16} className="text-white" />
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Amount</span>

                  <span className="text-green-400 font-semibold">
                    ₹{item.amount}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Category</span>

                  <span className="text-indigo-300">{item.category}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Date</span>

                  <span className="text-white">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
