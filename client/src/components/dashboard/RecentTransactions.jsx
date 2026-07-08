import { ArrowDownCircle, ArrowUpCircle, Receipt } from "lucide-react";

export default function RecentTransactions({ transactions = [] }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Recent Transactions</h2>

          <p className="text-slate-400 text-sm">
            Latest income & expense history
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {transactions.length === 0 ? (
          <div className="text-center text-slate-500 py-10">
            No Transactions Found
          </div>
        ) : (
          transactions.map((item) => {
            const income = item.type?.toLowerCase() === "income";

            return (
              <div
                key={item.id}
                className="flex items-center justify-between bg-slate-800 hover:bg-slate-700 rounded-2xl p-4 transition-all duration-300"
              >
                {/* Left */}

                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      income ? "bg-green-600" : "bg-red-500"
                    }`}
                  >
                    {income ? (
                      <ArrowUpCircle className="text-white" />
                    ) : (
                      <ArrowDownCircle className="text-white" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>

                    <p className="text-sm text-slate-400">{item.category}</p>
                  </div>
                </div>

                {/* Right */}

                <div className="text-right">
                  <p
                    className={`font-bold text-lg ${
                      income ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {income ? "+" : "-"}₹{item.amount}
                  </p>

                  <p className="text-xs text-slate-400">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
