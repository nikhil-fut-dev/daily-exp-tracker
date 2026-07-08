import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ShieldCheck, KeyRound, ArrowLeft, Wallet } from "lucide-react";
import toast from "react-hot-toast";

import { verifyOtp } from "../api/forgotPasswordApi";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await verifyOtp({
        email,
        otp,
      });

      toast.success(response.message);

      navigate("/reset-password", {
        state: {
          email,
          otp,
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left Side */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-violet-700 via-indigo-700 to-slate-900 relative overflow-hidden">
        <div className="absolute w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl -top-20 -left-20"></div>

        <div className="absolute w-96 h-96 bg-violet-500/20 rounded-full blur-3xl bottom-0 right-0"></div>

        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center">
            <Wallet size={40} className="text-white" />
          </div>

          <h1 className="text-5xl font-bold text-white mt-8">
            OTP Verification
          </h1>

          <p className="text-slate-200 mt-6 text-lg leading-8">
            Enter the One Time Password sent to your registered email address to
            continue.
          </p>

          <div className="mt-10 space-y-4 text-white">
            <div>✔ Secure Verification</div>

            <div>✔ Encrypted Authentication</div>

            <div>✔ Instant Password Reset</div>
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex-1 flex justify-center items-center p-6">
        <form
          onSubmit={submit}
          className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-violet-600 flex items-center justify-center mb-6">
            <ShieldCheck size={30} className="text-white" />
          </div>

          <h2 className="text-4xl font-bold text-white">Verify OTP</h2>

          <p className="text-slate-400 mt-3 mb-8">
            Enter the verification code sent to your email.
          </p>

          <div className="relative mb-6">
            <KeyRound
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-violet-500 tracking-[8px] text-center text-xl"
            />
          </div>

          <button className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 transition text-white font-semibold">
            Verify OTP
          </button>

          <div className="mt-8 text-center">
            <Link
              to="/forgot-password"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white"
            >
              <ArrowLeft size={18} />
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
