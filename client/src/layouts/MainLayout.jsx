import { Outlet } from "react-router-dom";
import { useState } from "react";
import SettingsModal from "../components/common/SettingsModal";

import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    JSON.parse(localStorage.getItem("sidebarCollapsed")) || false,
  );

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;

    setSidebarCollapsed(newState);

    localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
  };

  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-24" : "lg:ml-72"
        }`}
      >
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
          onSettings={() => setSettingsOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {settingsOpen && (
            <SettingsModal
              open={settingsOpen}
              onClose={() => setSettingsOpen(false)}
            />
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
