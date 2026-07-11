import {
  Wallet,
  CircleDollarSign,
  PiggyBank,
  TriangleAlert,
} from "lucide-react";

import SummaryCard from "./summary/SummaryCard";

export default function BudgetSummary({ budgets }) {
  const totalBudget = budgets.reduce(
    (sum, item) => sum + Number(item.limit),
    0,
  );

  const totalSpent = budgets.reduce((sum, item) => sum + Number(item.spent), 0);

  const remaining = totalBudget - totalSpent;

  const overBudget = budgets.reduce((sum, item) => {
    if (item.spent > item.limit) {
      return sum + (item.spent - item.limit);
    }

    return sum;
  }, 0);

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Total Budget"
        value={totalBudget}
        subtitle={`${budgets.length} Budget Categories`}
        icon={Wallet}
        color="bg-indigo-600"
        bg="bg-indigo-500"
      />

      <SummaryCard
        title="Total Spent"
        value={totalSpent}
        subtitle="Current Month Spending"
        icon={CircleDollarSign}
        color="bg-rose-600"
        bg="bg-rose-500"
      />

      <SummaryCard
        title="Remaining"
        value={remaining}
        subtitle="Available Budget"
        icon={PiggyBank}
        color="bg-emerald-600"
        bg="bg-emerald-500"
      />

      <SummaryCard
        title="Over Budget"
        value={overBudget}
        subtitle="Need Attention"
        icon={TriangleAlert}
        color="bg-amber-500"
        bg="bg-amber-400"
      />
    </div>
  );
}
