import { Pencil, Trash2, CalendarDays, Tag, IndianRupee } from "lucide-react";

export default function IncomeTable({
  records,
  handleDelete,
  setEditingId,
  setForm,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
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
                        onClick={() => handleDelete(item._id)}
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
    </div>
  );
}
