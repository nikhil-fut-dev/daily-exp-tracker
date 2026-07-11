import { IndianRupee, Wallet, PiggyBank, Receipt } from "lucide-react";

export default function ReportsSummary({ report }) {
  const cards = [
    {
      title: "Income",
      value: `₹${report?.totalIncome?.toLocaleString() || 0}`,
      color: "bg-emerald-500",
      icon: IndianRupee,
    },
    {
      title: "Expense",
      value: `₹${report?.totalExpense?.toLocaleString() || 0}`,
      color: "bg-red-500",
      icon: Wallet,
    },
    {
      title: "Savings",
      value: `₹${report?.savings?.toLocaleString() || 0}`,
      color: "bg-indigo-500",
      icon: PiggyBank,
    },
    {
      title: "Transactions",
      value: report?.transactions || 0,
      color: "bg-cyan-500",
      icon: Receipt,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-indigo-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{card.title}</p>

                <h2 className="mt-3 text-3xl font-bold text-white">
                  {card.value}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.color}`}
              >
                <Icon className="text-white" size={26} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
