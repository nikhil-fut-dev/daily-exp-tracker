import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { X } from "lucide-react";
import {
  LayoutDashboard,
  Wallet,
  Receipt,
  User,
  KeyRound,
  LogOut,
  IndianRupee,
} from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/");
  };

  const navItem =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium";

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-72
          bg-slate-900
          border-r
          border-slate-800
          flex
          flex-col
          z-50
          transform
          transition-transform
          duration-300

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
          `}
      >
        {/* Logo */}

        <div className="p-6 border-b border-slate-800">
          <div className="flex justify-end lg:hidden">
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center">
              <IndianRupee className="text-white" size={26} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">Exp Tracker</h2>

              <p className="text-xs text-slate-400">Personal Finance</p>
            </div>
          </div>
        </div>

        {/* Navigation */}

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${navItem} ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/income"
            className={({ isActive }) =>
              `${navItem} ${
                isActive
                  ? "bg-green-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            <Wallet size={20} />
            Income
          </NavLink>

          <NavLink
            to="/expense"
            className={({ isActive }) =>
              `${navItem} ${
                isActive
                  ? "bg-red-500 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            <Receipt size={20} />
            Expense
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${navItem} ${
                isActive
                  ? "bg-cyan-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            <User size={20} />
            Profile
          </NavLink>

          <NavLink
            to="/change-password"
            className={({ isActive }) =>
              `${navItem} ${
                isActive
                  ? "bg-orange-500 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            <KeyRound size={20} />
            Change Password
          </NavLink>
        </nav>

        {/* Upgrade Card */}

        <div className="mx-4 mb-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-5">
          <h3 className="text-white font-semibold">💎 Premium Dashboard</h3>

          <p className="text-indigo-100 text-sm mt-2">
            Track your income & expenses beautifully.
          </p>
        </div>

        {/* Logout */}

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
