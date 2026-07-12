import { Receipt, IndianRupee, Clock3, AlertTriangle } from "lucide-react";

export default function BillSummary({ bills }) {
  const totalBills = bills.length;

  const totalAmount = bills.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  const today = new Date();

  const upcoming = bills.filter((bill) => {
    if (bill.status === "Paid") return false;

    return new Date(bill.dueDate) >= today;
  }).length;

  const overdue = bills.filter((bill) => {
    if (bill.status === "Paid") return false;

    return new Date(bill.dueDate) < today;
  }).length;

  const cards = [
    {
      title: "Total Bills",
      value: totalBills,
      icon: Receipt,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
    },
    {
      title: "Total Amount",
      value: `₹${totalAmount.toLocaleString()}`,
      icon: IndianRupee,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Upcoming",
      value: upcoming,
      icon: Clock3,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      title: "Overdue",
      value: overdue,
      icon: AlertTriangle,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-indigo-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{card.title}</p>

                <h2 className={`mt-3 text-3xl font-bold ${card.color}`}>
                  {card.value}
                </h2>
              </div>

              <div className={`rounded-2xl p-4 ${card.bg}`}>
                <Icon size={30} className={card.color} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
