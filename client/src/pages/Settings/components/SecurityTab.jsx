import { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

import { changePassword } from "../../../api/changePasswordApi";

export default function SecurityTab() {
  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await changePassword(form);

      toast.success(response.message);

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}

      <div className="bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 rounded-3xl p-8 mb-8">
        <h1 className="text-4xl font-bold text-white">Security Settings</h1>

        <p className="text-orange-100 mt-2">
          Update your password to keep your account secure.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Security Tips */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center mb-6">
            <ShieldCheck className="text-white" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-white mb-6">Password Tips</h2>

          <div className="space-y-4">
            <div className="flex gap-3">
              <CheckCircle className="text-green-400 mt-1" size={18} />
              <p className="text-slate-300 text-sm">
                Use at least 8 characters.
              </p>
            </div>

            <div className="flex gap-3">
              <CheckCircle className="text-green-400 mt-1" size={18} />
              <p className="text-slate-300 text-sm">
                Include uppercase & lowercase letters.
              </p>
            </div>

            <div className="flex gap-3">
              <CheckCircle className="text-green-400 mt-1" size={18} />
              <p className="text-slate-300 text-sm">
                Add numbers and special characters.
              </p>
            </div>

            <div className="flex gap-3">
              <CheckCircle className="text-green-400 mt-1" size={18} />
              <p className="text-slate-300 text-sm">
                Avoid using personal information.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}

        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-8">
            Change Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current */}

            <PasswordField
              label="Current Password"
              value={form.currentPassword}
              onChange={(value) => setForm({ ...form, currentPassword: value })}
              show={showCurrent}
              setShow={setShowCurrent}
            />

            {/* New */}

            <PasswordField
              label="New Password"
              value={form.newPassword}
              onChange={(value) => setForm({ ...form, newPassword: value })}
              show={showNew}
              setShow={setShowNew}
            />

            {/* Confirm */}

            <PasswordField
              label="Confirm Password"
              value={form.confirmPassword}
              onChange={(value) => setForm({ ...form, confirmPassword: value })}
              show={showConfirm}
              setShow={setShowConfirm}
            />

            <button
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 transition py-4 rounded-xl text-white font-semibold disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function PasswordField({ label, value, onChange, show, setShow }) {
  return (
    <div>
      <label className="block mb-2 text-slate-300">{label}</label>

      <div className="relative">
        <Lock
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-12 text-white outline-none focus:ring-2 focus:ring-orange-500"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
}
