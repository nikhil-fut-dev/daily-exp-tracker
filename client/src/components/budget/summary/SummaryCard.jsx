import { motion } from "framer-motion";

export default function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  bg,
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-800
        bg-slate-900
        p-6
        shadow-xl
      "
    >
      {/* Glow */}
      <div
        className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-20 ${bg}`}
      />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm">{title}</p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            ₹{Number(value || 0).toLocaleString()}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>

        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}
        >
          <Icon size={28} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
}
