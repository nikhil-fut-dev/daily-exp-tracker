import { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserDropdown({ onSettings }) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Button */}

      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          items-center
          gap-3
          rounded-xl
          px-2
          py-2
          hover:bg-slate-800
          transition
        "
      >
        <img
          src={
            user?.avatar ||
            `https://ui-avatars.com/api/?name=${user?.fullName || "User"}`
          }
          alt=""
          className="w-11 h-11 rounded-full border-2 border-indigo-500 object-cover"
        />

        {/* Desktop */}

        <div className="hidden md:block text-left">
          <h4 className="text-white font-semibold text-sm">
            {user?.fullName || "User"}
          </h4>

          <p className="text-xs text-slate-400">{user?.email}</p>
        </div>

        <ChevronDown size={18} className="hidden md:block text-slate-400" />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            mt-3
            w-64
            rounded-2xl
            border
            border-slate-700
            bg-slate-900
            shadow-2xl
            overflow-hidden
            z-50
          "
        >
          <button
            onClick={() => {
              navigate("/profile");
              setOpen(false);
            }}
            className="flex items-center gap-3 w-full px-5 py-4 hover:bg-slate-800 text-white"
          >
            <User size={18} />
            My Profile
          </button>

          <button
            onClick={() => {
              onSettings();

              setOpen(false);
            }}
            className="flex items-center gap-3 w-full px-5 py-4 hover:bg-slate-800 text-white"
          >
            <Settings size={18} />
            Settings
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-5 py-4 hover:bg-red-600 text-red-400 hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
