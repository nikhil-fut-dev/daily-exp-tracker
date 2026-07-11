import { WalletCards, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function BudgetHeader({ onAdd }) {
  return (
    <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 rounded-3xl p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Left */}
        <div>
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <WalletCards size={36} />
            Budgets
          </h1>

          <p className="text-indigo-100 mt-2">
            Manage your monthly budgets and control spending.
          </p>
        </div>

        {/* Right */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onAdd}
          className="flex items-center justify-center gap-2 bg-white text-indigo-700 font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-slate-100 transition"
        >
          <Plus size={20} />
          Add Budget
        </motion.button>
      </div>
    </div>
  );
}
