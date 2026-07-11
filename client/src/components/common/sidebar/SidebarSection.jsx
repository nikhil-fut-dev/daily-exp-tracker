import { AnimatePresence, motion } from "framer-motion";
import SidebarItem from "./SidebarItem";

export default function SidebarSection({ section, navItem, sidebarCollapsed }) {
  return (
    <div className="mb-8">
      {/* Section Title */}

      <AnimatePresence>
        {!sidebarCollapsed && (
          <motion.h3
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.2 }}
            className="px-3 mb-4 text-xs font-bold uppercase tracking-[0.25em] text-slate-500"
          >
            {section.title}
          </motion.h3>
        )}
      </AnimatePresence>

      {/* Menu */}

      <div
        className={`space-y-2 ${
          sidebarCollapsed ? "flex flex-col items-center" : ""
        }`}
      >
        {section.items.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            navItem={navItem}
            sidebarCollapsed={sidebarCollapsed}
          />
        ))}
      </div>
    </div>
  );
}
