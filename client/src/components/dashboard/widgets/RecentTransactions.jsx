import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { useState } from "react";
import AllTransactionsModal from "./AllTransactionsModal";

export default function RecentTransactions({ dashboard }) {
  const [open, setOpen] = useState(false);

  const transactions = [
    ...dashboard.incomes.map((item) => ({
      ...item,
      type: "income",
    })),

    ...dashboard.expenses.map((item) => ({
      ...item,
      type: "expense",
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <div className="col-span-12 xl:col-span-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Recent Transactions</h2>

        <button
          onClick={() => setOpen(true)}
          className="text-indigo-400 text-sm hover:text-indigo-300"
        >
          View All
        </button>
      </div>

      <div className="space-y-4">
        {transactions.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border-b border-slate-800 pb-4"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center

                ${
                  item.type === "income" ? "bg-green-500/20" : "bg-red-500/20"
                }`}
              >
                {item.type === "income" ? (
                  <ArrowDownCircle className="text-green-400" />
                ) : (
                  <ArrowUpCircle className="text-red-400" />
                )}
              </div>

              <div>
                <h3 className="font-semibold text-white">{item.title}</h3>

                <p className="text-slate-400 text-sm">{item.category}</p>
              </div>
            </div>

            <div className="text-right">
              <h3
                className={`font-bold

                ${item.type === "income" ? "text-green-400" : "text-red-400"}`}
              >
                {item.type === "income" ? "+" : "-"}₹
                {Number(item.amount).toLocaleString()}
              </h3>

              <p className="text-xs text-slate-500">
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      <AllTransactionsModal
        open={open}
        onClose={() => setOpen(false)}
        dashboard={dashboard}
      />
    </div>
  );
}
