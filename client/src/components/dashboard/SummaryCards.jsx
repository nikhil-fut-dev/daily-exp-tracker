import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

export default function SummaryCards({ summary }) {
  const cards = [
    {
      title: "Balance",
      value: summary.totalBalance,
      icon: <Wallet size={24} />,
      color: "bg-indigo-600",
    },
    {
      title: "Income",
      value: summary.totalIncome,
      icon: <TrendingUp size={24} />,
      color: "bg-green-600",
    },
    {
      title: "Expense",
      value: summary.totalExpense,
      icon: <TrendingDown size={24} />,
      color: "bg-red-500",
    },
    {
      title: "Savings",
      value: summary.totalSavings,
      icon: <PiggyBank size={24} />,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex justify-between">
            <div>
              <p className="text-slate-400">{card.title}</p>

              <h2 className="text-3xl font-bold text-white mt-3">
                ₹{card.value}
              </h2>
            </div>

            <div
              className={`${card.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
