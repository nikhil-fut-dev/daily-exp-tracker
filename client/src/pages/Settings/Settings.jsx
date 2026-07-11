import { User, Shield, Bell, Palette, Globe, CircleHelp } from "lucide-react";
import { useState } from "react";
import ProfileTab from "./components/ProfileTab";
import SecurityTab from "./components/SecurityTab";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const menus = [
    {
      id: "profile",
      title: "Profile",
      icon: User,
    },
    {
      id: "security",
      title: "Security",
      icon: Shield,
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      disabled: true,
    },
    {
      id: "appearance",
      title: "Appearance",
      icon: Palette,
      disabled: true,
    },
    {
      id: "preferences",
      title: "Preferences",
      icon: Globe,
      disabled: true,
    },
    {
      id: "about",
      title: "About",
      icon: CircleHelp,
      disabled: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 rounded-3xl p-8">
        <h1 className="text-4xl font-bold text-white">Settings</h1>

        <p className="text-indigo-100 mt-2">
          Manage your account, security and application preferences.
        </p>
      </div>

      {/* Content */}

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Left */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4">
          {menus.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                disabled={item.disabled}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl mb-2 transition
                ${
                  activeTab === item.id
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }
                ${item.disabled && "opacity-40 cursor-not-allowed"}
                `}
              >
                <Icon size={20} />

                {item.title}
              </button>
            );
          })}
        </div>

        {/* Right */}

        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-3xl p-8 min-h-[650px]">
          {activeTab === "profile" && <ProfileTab />}

          {activeTab === "security" && <SecurityTab />}
        </div>
      </div>
    </div>
  );
}
