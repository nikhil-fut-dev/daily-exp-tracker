import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Wallet } from "lucide-react";
import toast from "react-hot-toast";

import { registerUser } from "../api/authApi";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Creating Account...");

    try {
      const data = await registerUser(form);

      toast.success(data.message || "Registration Successful", {
        id: toastId,
      });

      //alert(data.message || "Registration Successful");

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration Failed", {
        id: toastId,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left Side */}

      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-emerald-600 via-cyan-600 to-slate-900">
        <div className="absolute w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl -top-20 -left-20"></div>

        <div className="absolute w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center">
            <Wallet size={40} className="text-white" />
          </div>

          <h1 className="text-5xl font-bold text-white mt-8">
            Join Exp Tracker Pro
          </h1>

          <p className="text-slate-100 mt-6 text-lg leading-8">
            Create your account and take complete control of your income,
            expenses and financial goals.
          </p>

          <div className="mt-10 space-y-4 text-white">
            <div>✔ Smart Dashboard</div>

            <div>✔ Expense Analytics</div>

            <div>✔ Monthly Reports</div>

            <div>✔ Secure Cloud Storage</div>
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex-1 flex justify-center items-center p-6">
        <form
          onSubmit={submit}
          className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8"
        >
          <h2 className="text-4xl font-bold text-white">Create Account</h2>

          <p className="text-slate-400 mt-2 mb-8">
            Start your financial journey today.
          </p>

          {/* Full Name */}

          <div className="relative mb-5">
            <User
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Full Name"
              value={form.fullName}
              onChange={(e) =>
                setForm({
                  ...form,
                  fullName: e.target.value,
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

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
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Password */}

          <div className="relative mb-6">
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
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-12 text-white outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button className="w-full bg-emerald-600 hover:bg-emerald-700 transition py-3 rounded-xl text-white font-semibold">
            Create Account
          </button>

          <p className="mt-8 text-center text-slate-400">
            Already have an account?
            <Link
              to="/"
              className="ml-2 text-emerald-400 hover:text-emerald-300"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
