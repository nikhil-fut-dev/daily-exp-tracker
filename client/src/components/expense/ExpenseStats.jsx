import { CreditCard, Receipt, TrendingDown, IndianRupee } from "lucide-react";

export default function ExpenseStats({ expenses }) {
  const total = expenses.reduce((sum, item) => sum + Number(item.amount), 0);

  const highest = expenses.length
    ? Math.max(...expenses.map((e) => Number(e.amount)))
    : 0;

  const average = expenses.length ? Math.round(total / expenses.length) : 0;

  const cards = [
    {
      title: "Total Expense",
      value: `₹${total}`,
      icon: <CreditCard size={24} />,
      color: "bg-red-600",
    },
    {
      title: "Entries",
      value: expenses.length,
      icon: <Receipt size={24} />,
      color: "bg-indigo-600",
    },
    {
      title: "Highest",
      value: `₹${highest}`,
      icon: <TrendingDown size={24} />,
      color: "bg-orange-500",
    },
    {
      title: "Average",
      value: `₹${average}`,
      icon: <IndianRupee size={24} />,
      color: "bg-cyan-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:-translate-y-2 transition"
        >
          <div className="flex justify-between">
            <div>
              <p className="text-slate-400">{card.title}</p>

              <h2 className="text-3xl font-bold text-white mt-3">
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
