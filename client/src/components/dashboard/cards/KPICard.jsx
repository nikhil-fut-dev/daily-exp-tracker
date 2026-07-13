import { motion } from "framer-motion";

import AnimatedCounter from "../common/AnimatedCounter";

export default function KPICard({
  title,
  value,
  icon,
  color,
  growth,
  children,
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
      rounded-3xl
      border
      border-slate-800
      bg-slate-900/70
      backdrop-blur-xl
      p-6
      shadow-xl
      "
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-400 text-sm">{title}</p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            <AnimatedCounter value={value} />
          </h2>

          <p className="mt-3 text-sm text-emerald-400">▲ {growth}%</p>
        </div>

        <div
          className={`
          w-14
          h-14
          rounded-2xl
          flex
          items-center
          justify-center
          ${color}
          `}
        >
          {icon}
        </div>
      </div>

      <div className="mt-6">{children}</div>
    </motion.div>
  );
}
