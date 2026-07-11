import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserCard({ sidebarCollapsed }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      title={sidebarCollapsed ? user?.fullName || "User" : ""}
      className={`
        mx-4
        mb-4
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/70
        backdrop-blur-lg
        transition-all
        duration-300
        ${sidebarCollapsed ? "p-3 flex justify-center" : "p-4"}
      `}
    >
      {sidebarCollapsed ? (
        <img
          src={
            user?.avatar ||
            `https://ui-avatars.com/api/?name=${user?.fullName || "User"}`
          }
          alt=""
          className="w-12 h-12 rounded-2xl object-cover border-2 border-indigo-500"
        />
      ) : (
        <>
          <div className="flex items-center gap-3">
            <img
              src={
                user?.avatar ||
                `https://ui-avatars.com/api/?name=${user?.fullName || "User"}`
              }
              alt=""
              className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500"
            />

            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-white truncate">
                {user?.fullName}
              </h4>

              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 w-full rounded-xl bg-red-500 hover:bg-red-600 transition py-3 text-white font-medium"
          >
            <div className="flex items-center justify-center gap-2">
              <LogOut size={18} />
              Logout
            </div>
          </button>
        </>
      )}
    </motion.div>
  );
}
