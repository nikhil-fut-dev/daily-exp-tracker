import { Crown } from "lucide-react";
import { motion } from "framer-motion";

export default function PremiumCard({ sidebarCollapsed }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      title={sidebarCollapsed ? "Premium Dashboard" : ""}
      className={`
        mx-4
        mb-4
        rounded-3xl
        bg-gradient-to-br
        from-indigo-600
        via-violet-600
        to-cyan-500
        shadow-xl
        transition-all
        duration-300
        ${sidebarCollapsed ? "p-4 flex items-center justify-center" : "p-5"}
      `}
    >
      {sidebarCollapsed ? (
        <Crown className="text-white" size={28} />
      ) : (
        <>
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
            <Crown className="text-white" size={22} />
          </div>

          <h3 className="text-white font-bold text-lg">Premium Dashboard</h3>

          <p className="text-sm text-indigo-100 mt-2 leading-6">
            Manage income, expenses, budgets and reports in one place.
          </p>
        </>
      )}
    </motion.div>
  );
}
