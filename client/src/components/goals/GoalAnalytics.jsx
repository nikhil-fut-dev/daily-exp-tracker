import { Target, Wallet, PiggyBank, TrendingUp } from "lucide-react";

export default function GoalAnalytics({ goals }) {
  const totalGoals = goals.length;

  const totalTarget = goals.reduce(
    (sum, goal) => sum + (goal.targetAmount || 0),
    0,
  );

  const totalSaved = goals.reduce(
    (sum, goal) => sum + (goal.savedAmount || 0),
    0,
  );

  const remaining = totalTarget - totalSaved;

  const completion =
    totalTarget === 0 ? 0 : Math.round((totalSaved / totalTarget) * 100);

  const cards = [
    {
      title: "Total Goals",
      value: totalGoals,
      icon: Target,
      color: "text-indigo-400",
    },
    {
      title: "Target Amount",
      value: `₹${totalTarget.toLocaleString()}`,
      icon: Wallet,
      color: "text-cyan-400",
    },
    {
      title: "Total Saved",
      value: `₹${totalSaved.toLocaleString()}`,
      icon: PiggyBank,
      color: "text-green-400",
    },
    {
      title: "Remaining",
      value: `₹${remaining.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{card.title}</p>

                <h2 className="mt-3 text-3xl font-bold text-white">
                  {card.value}
                </h2>
              </div>

              <card.icon className={card.color} size={32} />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Goal Completion</h3>

          <span className="text-indigo-400 font-bold">{completion}%</span>
        </div>

        <div className="h-4 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-700"
            style={{
              width: `${completion}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
