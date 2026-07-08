import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
  Wallet,
} from "lucide-react";

import { resetPassword } from "../api/forgotPasswordApi";

export default function ResetPassword() {
  const navigate = useNavigate();

  const location = useLocation();

  const { email, otp } = location.state || {};

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await resetPassword({
        email,
        otp,
        ...form,
      });

      toast.success(response.message);

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Password Reset Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left Side */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-emerald-600 via-teal-600 to-slate-900 relative overflow-hidden">
        <div className="absolute w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl -top-20 -left-20"></div>

        <div className="absolute w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl bottom-0 right-0"></div>

        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center">
            <Wallet size={40} className="text-white" />
          </div>

          <h1 className="text-5xl font-bold text-white mt-8">
            Create New Password
          </h1>

          <p className="text-slate-200 mt-6 text-lg leading-8">
            Your new password should be secure and different from previously
            used passwords to keep your account safe.
          </p>

          <div className="mt-10 space-y-4 text-white">
            <div>✔ Strong Password Protection</div>

            <div>✔ Secure Authentication</div>

            <div>✔ Instant Account Recovery</div>
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex-1 flex justify-center items-center p-6">
        <form
          onSubmit={submit}
          className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center mb-6">
            <ShieldCheck size={30} className="text-white" />
          </div>

          <h2 className="text-4xl font-bold text-white">Reset Password</h2>

          <p className="text-slate-400 mt-3 mb-8">
            Enter your new password below.
          </p>

          {/* New Password */}

          <div className="relative mb-5">
            <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type={showNew ? "text" : "password"}
              placeholder="New Password"
              value={form.newPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  newPassword: e.target.value,
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-12 text-white outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}

          <div className="relative mb-6">
            <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e.target.value,
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-12 text-white outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition text-white font-semibold">
            Reset Password
          </button>

          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white"
            >
              <ArrowLeft size={18} />
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
