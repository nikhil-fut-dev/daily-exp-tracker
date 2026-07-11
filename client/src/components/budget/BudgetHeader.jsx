import { WalletCards } from "lucide-react";

export default function BudgetHeader() {
  return (
    <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 rounded-3xl p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <WalletCards size={36} />
            Budgets
          </h1>

          <p className="text-indigo-100 mt-2">
            Manage your monthly budgets and control spending.
          </p>
        </div>
      </div>
    </div>
  );
}
