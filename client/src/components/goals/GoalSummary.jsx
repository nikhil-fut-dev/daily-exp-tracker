import { Target, PiggyBank, Wallet, Trophy } from "lucide-react";

export default function GoalSummary({ goals }) {
  const totalTarget = goals.reduce(
    (sum, item) => sum + (item.targetAmount || 0),
    0,
  );

  const totalSaved = goals.reduce(
    (sum, item) => sum + (item.savedAmount || 0),
    0,
  );

  const remaining = totalTarget - totalSaved;

  const completed = goals.filter((g) => g.status === "Completed").length;

  const cards = [
    {
      title: "Target",
      value: `₹${totalTarget.toLocaleString()}`,
      color: "text-indigo-400",
      bg: "bg-indigo-500/15",
      icon: Target,
    },
    {
      title: "Saved",
      value: `₹${totalSaved.toLocaleString()}`,
      color: "text-green-400",
      bg: "bg-green-500/15",
      icon: PiggyBank,
    },
    {
      title: "Remaining",
      value: `₹${remaining.toLocaleString()}`,
      color: "text-yellow-400",
      bg: "bg-yellow-500/15",
      icon: Wallet,
    },
    {
      title: "Completed",
      value: completed,
      color: "text-cyan-400",
      bg: "bg-cyan-500/15",
      icon: Trophy,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:border-indigo-500 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{card.title}</p>

                <h2 className={`mt-3 text-3xl font-bold ${card.color}`}>
                  {card.value}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.bg}`}
              >
                <Icon className={card.color} size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
