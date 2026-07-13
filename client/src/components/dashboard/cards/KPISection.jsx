import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

import KPICard from "./KPICard";

export default function KPISection({ dashboard }) {
  return (
    <div className="col-span-12">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <KPICard
          title="Total Balance"
          value={dashboard.balance}
          growth={12}
          icon={<Wallet size={24} />}
          color="bg-indigo-500/20 text-indigo-400"
        />

        <KPICard
          title="Income"
          value={dashboard.income}
          growth={18}
          icon={<TrendingUp size={24} />}
          color="bg-green-500/20 text-green-400"
        />

        <KPICard
          title="Expense"
          value={dashboard.expense}
          growth={8}
          icon={<TrendingDown size={24} />}
          color="bg-red-500/20 text-red-400"
        />

        <KPICard
          title="Savings"
          value={dashboard.saving}
          growth={25}
          icon={<PiggyBank size={24} />}
          color="bg-cyan-500/20 text-cyan-400"
        />
      </div>
    </div>
  );
}
