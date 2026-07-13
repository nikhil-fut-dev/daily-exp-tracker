import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export default function TransactionTable({ records }) {
  if (records.length === 0) {
    return (
      <div className="flex h-72 items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white">
            No Transactions Found
          </h2>

          <p className="mt-2 text-slate-400">Try changing filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="lg:sticky lg:top-0 bg-slate-900 z-10">
          <tr className="border-b border-slate-800">
            <th className="px-6 py-4 text-left text-slate-400">Transaction</th>

            <th className="px-6 py-4 text-left text-slate-400">Category</th>

            <th className="px-6 py-4 text-center text-slate-400">Type</th>

            <th className="px-6 py-4 text-center text-slate-400">Date</th>

            <th className="px-6 py-4 text-right text-slate-400">Amount</th>
          </tr>
        </thead>

        <tbody>
          {records.map((item) => (
            <tr
              key={item._id}
              className="border-b border-slate-800 hover:bg-slate-800/40 transition"
            >
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center

                    ${
                      item.type === "Income"
                        ? "bg-green-500/20"
                        : "bg-red-500/20"
                    }`}
                  >
                    {item.type === "Income" ? (
                      <ArrowDownCircle className="text-green-400" />
                    ) : (
                      <ArrowUpCircle className="text-red-400" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>

                    <p className="text-xs text-slate-500">{item.note}</p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-5 text-slate-300">{item.category}</td>

              <td className="px-6 py-5 text-center">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold

                  ${
                    item.type === "Income"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {item.type}
                </span>
              </td>

              <td className="px-6 py-5 text-center text-slate-400">
                {new Date(item.date).toLocaleDateString()}
              </td>

              <td
                className={`px-6 py-5 text-right font-bold

                ${item.type === "Income" ? "text-green-400" : "text-red-400"}`}
              >
                {item.type === "Income" ? "+" : "-"}₹
                {Number(item.amount).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
