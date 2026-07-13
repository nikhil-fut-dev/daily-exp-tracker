import { motion } from "framer-motion";

export default function DashboardCard({
  title,
  subtitle,
  action,
  children,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -3 }}
      className={`
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/70
        backdrop-blur-xl
        shadow-xl
        overflow-hidden
        ${className}
      `}
    >
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-white">{title}</h2>
            )}

            {subtitle && (
              <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
            )}
          </div>

          {action}
        </div>
      )}

      <div className="p-6">{children}</div>
    </motion.div>
  );
}
