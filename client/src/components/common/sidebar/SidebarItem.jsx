import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function SidebarItem({ item, navItem, sidebarCollapsed }) {
  const Icon = item.icon;

  // Disabled Item
  if (item.disabled) {
    return (
      <motion.button
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => toast("🚧 This feature is coming soon")}
        title={sidebarCollapsed ? item.label : ""}
        className={`${navItem} w-full text-slate-500 hover:bg-slate-800`}
      >
        <Icon size={20} />

        {!sidebarCollapsed && (
          <>
            <span className="flex-1 text-left">{item.label}</span>

            <span className="text-[10px] bg-slate-700 px-2 py-1 rounded-full">
              Soon
            </span>
          </>
        )}
      </motion.button>
    );
  }

  // Active Item
  return (
    <NavLink to={item.path}>
      {({ isActive }) => (
        <motion.div
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          className={`
            relative
            ${navItem}
            ${
              isActive
                ? "bg-indigo-600 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-800"
            }
          `}
        >
          {/* Left Indicator */}

          {isActive && (
            <motion.div
              layoutId="active-sidebar"
              className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-cyan-300"
            />
          )}

          <Icon size={20} />

          {!sidebarCollapsed && <span className="flex-1">{item.label}</span>}

          {!sidebarCollapsed && item.badge && (
            <span className="text-xs bg-emerald-500 px-2 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}

          {!sidebarCollapsed && item.count > 0 && (
            <span className="text-xs bg-red-500 min-w-5 h-5 rounded-full flex items-center justify-center">
              {item.count}
            </span>
          )}
        </motion.div>
      )}
    </NavLink>
  );
}
