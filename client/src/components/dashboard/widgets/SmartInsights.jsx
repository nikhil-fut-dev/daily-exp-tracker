import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  AlertTriangle,
  Target,
  Wallet,
} from "lucide-react";

export default function SmartInsights({ dashboard }) {
  const {
    income,
    expense,
    saving,
    budgets = [],
    goals = [],
    bills = [],
    expenses = [],
  } = dashboard;

  const overBudget = budgets.filter(
    (b) => Number(b.spent || 0) > Number(b.limit),
  );

  const pendingGoals = goals.filter(
    (g) => Number(g.savedAmount || 0) < Number(g.targetAmount),
  );

  const dueBills = bills.filter((b) => b.status !== "Paid");

  const avgExpense =
    expenses.length > 0 ? Math.round(expense / expenses.length) : 0;

  const savingRate = income > 0 ? ((saving / income) * 100).toFixed(1) : 0;

  const insights = [
    {
      icon: <PiggyBank size={18} />,
      color: "text-green-400",
      text: `You saved ₹${saving.toLocaleString()} this period.`,
    },
    {
      icon: <Wallet size={18} />,
      color: "text-cyan-400",
      text: `Average expense ₹${avgExpense.toLocaleString()}.`,
    },
    {
      icon: <TrendingUp size={18} />,
      color: "text-indigo-400",
      text: `Savings Rate ${savingRate}%`,
    },
    {
      icon: <AlertTriangle size={18} />,
      color: "text-red-400",
      text: `${overBudget.length} budget(s) exceeded.`,
    },
    {
      icon: <Target size={18} />,
      color: "text-yellow-400",
      text: `${pendingGoals.length} goal(s) still active.`,
    },
    {
      icon: <TrendingDown size={18} />,
      color: "text-orange-400",
      text: `${dueBills.length} bill(s) pending.`,
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl">
      <h2 className="mb-6 text-xl font-bold text-white">
        Smart Financial Insights
      </h2>

      <div className="space-y-4">
        {insights.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-2xl bg-slate-800/50 p-4"
          >
            <div className={item.color}>{item.icon}</div>

            <p className="text-sm text-slate-300">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
