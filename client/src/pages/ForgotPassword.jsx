import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, ArrowLeft, ShieldCheck, Wallet } from "lucide-react";
import toast from "react-hot-toast";

import { sendOtp } from "../api/forgotPasswordApi";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await sendOtp(email);

      toast.success(response.message);

      navigate("/verify-otp", {
        state: { email },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left Side */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 relative overflow-hidden">
        <div className="absolute w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl -top-20 -left-20"></div>

        <div className="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl bottom-0 right-0"></div>

        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center">
            <Wallet size={42} className="text-white" />
          </div>

          <h1 className="text-5xl font-bold text-white mt-8">
            Forgot Password?
          </h1>

          <p className="text-slate-200 mt-6 text-lg leading-8">
            Don't worry. Enter your registered email address and we'll send a
            secure OTP to reset your password.
          </p>

          <div className="mt-10 space-y-4 text-white">
            <div>✔ Secure OTP Verification</div>

            <div>✔ Fast Password Recovery</div>

            <div>✔ Protected Account Access</div>
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex-1 flex justify-center items-center p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center mb-6">
            <ShieldCheck className="text-white" size={30} />
          </div>

          <h2 className="text-4xl font-bold text-white">Reset Password</h2>

          <p className="text-slate-400 mt-3 mb-8">
            Enter your registered email to receive an OTP.
          </p>

          <div className="relative mb-6">
            <Mail
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 transition text-white font-semibold"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition"
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
