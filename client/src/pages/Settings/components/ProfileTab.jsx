import { useState } from "react";
import { User, Mail, Camera, Upload } from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../../../context/AuthContext";
import { updateProfile } from "../../../api/profileApi";

export default function ProfileTab() {
  const { user, login } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || "");

  const [avatar, setAvatar] = useState(null);

  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Updating Profile...");

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("fullName", fullName);

      if (avatar) {
        formData.append("avatar", avatar);
      }

      const response = await updateProfile(formData);

      login(response.user);

      setAvatar(null);

      toast.success("Profile Updated Successfully", {
        id: toastId,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile Update Failed", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 rounded-3xl p-8 mb-8">
        <h1 className="text-4xl font-bold text-white">My Profile</h1>

        <p className="text-indigo-100 mt-2">
          Manage your personal information.
        </p>
      </div>

      <form
        onSubmit={submit}
        className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="p-10">
          {/* Avatar */}

          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={
                  avatar
                    ? URL.createObjectURL(avatar)
                    : user?.avatar || "https://via.placeholder.com/200"
                }
                alt="profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
              />

              <label className="absolute bottom-2 right-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 p-3 rounded-full">
                <Camera size={18} className="text-white" />

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
              </label>
            </div>

            <h2 className="text-white text-2xl font-bold mt-6">
              {user?.fullName}
            </h2>

            <p className="text-slate-400">{user?.email}</p>
          </div>

          {/* Form */}

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div>
              <label className="text-slate-300 mb-2 block">Full Name</label>

              <div className="relative">
                <User
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 mb-2 block">Email</label>

              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  value={user?.email || ""}
                  disabled
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Upload Info */}

          {avatar && (
            <div className="mt-8 bg-slate-800 rounded-2xl p-4 flex items-center gap-3">
              <Upload className="text-indigo-400" />

              <div>
                <p className="text-white font-medium">{avatar.name}</p>

                <p className="text-slate-400 text-sm">Ready to upload</p>
              </div>
            </div>
          )}

          {/* Button */}

          <button
            disabled={loading}
            className="mt-10 w-full bg-indigo-600 hover:bg-indigo-700 transition rounded-xl py-4 text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
