import { Wallet, TrendingUp, IndianRupee, BarChart3 } from "lucide-react";

export default function IncomeStats({ incomes }) {
  const totalIncome = incomes.reduce(
    (sum, item) => sum + Number(item.amount),
    0,
  );

  const highestIncome =
    incomes.length > 0 ? Math.max(...incomes.map((i) => Number(i.amount))) : 0;

  const averageIncome =
    incomes.length > 0 ? Math.round(totalIncome / incomes.length) : 0;

  const cards = [
    {
      title: "Total Income",
      value: `₹${totalIncome}`,
      icon: <Wallet size={24} />,
      color: "bg-green-600",
    },
    {
      title: "Entries",
      value: incomes.length,
      icon: <BarChart3 size={24} />,
      color: "bg-indigo-600",
    },
    {
      title: "Highest",
      value: `₹${highestIncome}`,
      icon: <TrendingUp size={24} />,
      color: "bg-orange-500",
    },
    {
      title: "Average",
      value: `₹${averageIncome}`,
      icon: <IndianRupee size={24} />,
      color: "bg-cyan-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 hover:-translate-y-2 transition duration-300"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-400 text-sm sm:text-base">{card.title}</p>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3 break-all">
                {card.value}
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
