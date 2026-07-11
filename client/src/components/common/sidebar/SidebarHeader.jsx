import { X, IndianRupee, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function SidebarHeader({
  sidebarOpen,
  setSidebarOpen,
  sidebarCollapsed,
  toggleSidebar,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="border-b border-slate-800 p-6"
    >
      {/* Mobile Close */}

      <div className="flex justify-end lg:hidden mb-3">
        <button
          onClick={() => setSidebarOpen(false)}
          className="text-slate-400 hover:text-white transition"
        >
          <X size={22} />
        </button>
      </div>

      {/* Logo */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 overflow-hidden">
          {/*<motion.div
            layout
            className="
        w-12
        h-12
        rounded-2xl
        bg-gradient-to-br
        from-indigo-600
        to-violet-600
        flex
        items-center
        justify-center
        shadow-lg
        shrink-0
      "
          >
            <IndianRupee className="text-white" size={24} />
          </motion.div>*/}

          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-xl font-bold text-white">Exp Tracker</h2>

              <p className="text-xs text-slate-400">Personal Finance Manager</p>
            </motion.div>
          )}
        </div>

        {/* Desktop Collapse */}

        <button
          onClick={toggleSidebar}
          className="hidden lg:flex w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 items-center justify-center transition"
        >
          {sidebarCollapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </button>
      </div>
    </motion.div>
  );
}
