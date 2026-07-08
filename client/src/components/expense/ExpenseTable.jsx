import { Pencil, Trash2, CalendarDays, CreditCard, Tag } from "lucide-react";

export default function ExpenseTable({
  records,
  handleDelete,
  setEditingId,
  setForm,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="text-left px-6 py-4 text-slate-300">Title</th>

              <th className="text-left px-6 py-4 text-slate-300">Amount</th>

              <th className="text-left px-6 py-4 text-slate-300">Category</th>

              <th className="text-left px-6 py-4 text-slate-300">Payment</th>

              <th className="text-left px-6 py-4 text-slate-300">Date</th>

              <th className="text-center px-6 py-4 text-slate-300">Action</th>
            </tr>
          </thead>

          <tbody>
            {records.map((item) => (
              <tr
                key={item._id}
                className="border-t border-slate-800 hover:bg-slate-800/60"
              >
                <td className="px-6 py-5 text-white">{item.title}</td>

                <td className="px-6 py-5">
                  <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full">
                    ₹{item.amount}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <span className="inline-flex items-center gap-2 bg-indigo-600/20 px-3 py-1 rounded-full">
                    <Tag size={15} />

                    {item.category}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <span className="inline-flex items-center gap-2 bg-cyan-600/20 px-3 py-1 rounded-full">
                    <CreditCard size={15} />

                    {item.paymentMethod}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={15} />

                    {new Date(item.date).toLocaleDateString()}
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setEditingId(item._id);

                        setForm({
                          title: item.title,
                          amount: item.amount,
                          category: item.category,
                          paymentMethod: item.paymentMethod || "",
                          note: item.note || "",
                          date: item.date?.split("T")[0],
                        });
                      }}
                      className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="w-10 h-10 rounded-xl bg-red-600 hover:bg-red-700 flex items-center justify-center"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden divide-y divide-slate-800">
        {records.length === 0 ? (
          <div className="p-6 text-center text-slate-500">No Expense Found</div>
        ) : (
          records.map((item) => (
            <div key={item._id} className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>

                  <p className="text-sm text-slate-400 mt-1">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>

                <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full">
                  ₹{item.amount}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 bg-indigo-600/20 px-3 py-1 rounded-full text-sm">
                  <Tag size={14} />
                  {item.category}
                </span>

                <span className="inline-flex items-center gap-2 bg-cyan-600/20 px-3 py-1 rounded-full text-sm">
                  <CreditCard size={14} />
                  {item.paymentMethod}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditingId(item._id);

                    setForm({
                      title: item.title,
                      amount: item.amount,
                      category: item.category,
                      paymentMethod: item.paymentMethod || "",
                      note: item.note || "",
                      date: item.date?.split("T")[0],
                    });
                  }}
                  className="flex-1 bg-blue-600 py-3 rounded-xl text-white flex items-center justify-center gap-2"
                >
                  <Pencil size={18} />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 bg-red-600 py-3 rounded-xl text-white flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
