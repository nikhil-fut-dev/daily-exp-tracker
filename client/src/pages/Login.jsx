import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Wallet } from "lucide-react";
import toast from "react-hot-toast";

import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging in...");

    try {
      const data = await loginUser(form);

      toast.success("Login Successful", {
        id: toastId,
      });

      localStorage.setItem("token", data.token);

      login(data.user);

      //alert(data.message);

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed", {
        id: toastId,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left Side */}

      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-700 via-violet-700 to-slate-900">
        <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -top-20 -left-20"></div>

        <div className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl bottom-0 right-0"></div>

        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center backdrop-blur-md">
            <Wallet size={40} className="text-white" />
          </div>

          <h1 className="text-5xl font-bold text-white mt-8">
            Exp Tracker Pro
          </h1>

          <p className="text-slate-200 mt-6 text-lg leading-8">
            Track your income, manage expenses, analyze reports and stay
            financially organized with one powerful dashboard.
          </p>

          <div className="mt-10 space-y-4">
            <div className="text-white">✔ Income Tracking</div>

            <div className="text-white">✔ Expense Analytics</div>

            <div className="text-white">✔ Monthly Reports</div>

            <div className="text-white">✔ Secure Dashboard</div>
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex-1 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl"
        >
          <h2 className="text-4xl font-bold text-white">Welcome Back 👋</h2>

          <p className="text-slate-400 mt-3 mb-8">
            Login to continue managing your finances.
          </p>

          {/* Email */}

          <div className="relative mb-5">
            <Mail
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}

          <div className="relative mb-4">
            <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-12 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex justify-end mb-6">
            <Link
              to="/forgot-password"
              className="text-indigo-400 hover:text-indigo-300"
            >
              Forgot Password?
            </Link>
          </div>

          <button className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold">
            Login
          </button>

          <p className="text-center text-slate-400 mt-8">
            Don't have an account?
            <Link
              to="/register"
              className="text-indigo-400 ml-2 hover:text-indigo-300"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
