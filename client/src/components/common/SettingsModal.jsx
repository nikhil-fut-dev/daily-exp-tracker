import { useEffect, useState } from "react";
import { X, Camera, Save, Lock } from "lucide-react";
import { toast } from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../api/profileApi";
import { changePassword } from "../../api/changePasswordApi";

export default function SettingsModal({ open, onClose }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const { user, login } = useAuth();

  const [fullName, setFullName] = useState("");

  const [avatar, setAvatar] = useState(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const [passwordLoading, setPasswordLoading] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!user) return;

    setFullName(user.fullName || "");

    setPreview(
      user.avatar || `https://ui-avatars.com/api/?name=${user.fullName}`,
    );
  }, [user, open]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setAvatar(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleProfileUpdate = async () => {
    const toastId = toast.loading("Updating profile...");

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("fullName", fullName);

      if (avatar) {
        formData.append("avatar", avatar);
      }

      const response = await updateProfile(formData);

      login(response.user);

      toast.success("Profile Updated Successfully", {
        id: toastId,
      });

      setAvatar(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Profile Update Failed", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (
      passwords.currentPassword === "" &&
      passwords.newPassword === "" &&
      passwords.confirmPassword === ""
    ) {
      return;
    }

    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      return toast.error("Please fill all password fields");
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const toastId = toast.loading("Changing Password...");

    try {
      setPasswordLoading(true);

      const response = await changePassword(passwords);

      toast.success(response.message || "Password Changed Successfully", {
        id: toastId,
      });

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Password Change Failed", {
        id: toastId,
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleSave = async () => {
    const profileChanged = fullName !== user?.fullName || avatar;

    const passwordChanged =
      passwords.currentPassword ||
      passwords.newPassword ||
      passwords.confirmPassword;

    if (!profileChanged && !passwordChanged) {
      return toast("No changes detected");
    }

    if (profileChanged) {
      await handleProfileUpdate();
    }

    if (passwordChanged) {
      await handlePasswordChange();
    }

    onClose();
  };

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="
  fixed
  inset-0
  z-[100]
  bg-black/60
  backdrop-blur-sm
  flex
  justify-end
  md:justify-center
  items-stretch
  md:items-center
"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
relative
bg-slate-900
border
border-slate-700
shadow-2xl

w-full
md:max-w-4xl

h-full
md:h-auto

md:max-h-[92vh]

md:rounded-3xl

rounded-none

md:overflow-hidden

overflow-y-auto

animate-slide
"
          >
            {/* Header */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900 p-4 sm:p-6">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Account Settings
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  Manage your account information
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-red-500 transition flex items-center justify-center"
              >
                <X className="text-white" />
              </button>
            </div>

            {/* Body */}

            <div
              className="
    grid
    md:grid-cols-3
    overflow-y-auto
    flex-1
  "
            >
              {/* Left */}

              <div className="border-b md:border-b-0 md:border-r border-slate-800 p-6 sm:p-8 flex flex-col items-center">
                <img
                  src={preview}
                  alt=""
                  className="w-36 h-36 rounded-full border-4 border-indigo-500 object-cover"
                />

                <label className="mt-5 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleAvatarChange}
                  />

                  <div className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl transition">
                    <Camera size={18} />
                    Change Photo
                  </div>
                </label>
              </div>

              {/* Right */}

              <div className="md:col-span-2 p-5 sm:p-8">
                <h3 className="text-white text-lg font-semibold mb-6">
                  Personal Information
                </h3>

                <div className="space-y-5">
                  <div>
                    <label className="text-slate-400 text-sm">Full Name</label>

                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="mt-2 w-full rounded-xl bg-slate-800 border border-slate-700 p-4 text-white outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 text-sm">Email</label>

                    <input
                      value={user?.email}
                      disabled
                      className="mt-2 w-full rounded-xl bg-slate-800 border border-slate-700 p-4 text-slate-400"
                    />
                  </div>
                </div>

                <hr className="my-8 border-slate-800" />

                <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                  <Lock size={20} />
                  Change Password
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={passwords.currentPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        currentPassword: e.target.value,
                      })
                    }
                    className="rounded-xl bg-slate-800 border border-slate-700 p-4 text-white"
                  />

                  <input
                    type="password"
                    placeholder="New Password"
                    value={passwords.newPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        newPassword: e.target.value,
                      })
                    }
                    className="rounded-xl bg-slate-800 border border-slate-700 p-4 text-white"
                  />

                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={passwords.confirmPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="rounded-xl bg-slate-800 border border-slate-700 p-4 text-white md:col-span-2"
                  />
                </div>

                <div className="sticky bottom-0 bg-slate-900 pt-6">
                  <button
                    onClick={handleSave}
                    disabled={loading || passwordLoading}
                    className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl transition"
                  >
                    <Save size={18} />
                    {loading || passwordLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
