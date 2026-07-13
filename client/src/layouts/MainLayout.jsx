import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import SettingsModal from "../components/common/SettingsModal";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    JSON.parse(localStorage.getItem("sidebarCollapsed")) || false,
  );

  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleSidebar = () => {
    const next = !sidebarCollapsed;

    setSidebarCollapsed(next);

    localStorage.setItem("sidebarCollapsed", JSON.stringify(next));
  };

  return (
    <div className="h-dvh overflow-hidden bg-slate-950">
      {/* Sidebar */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />

      {/* Content */}

      <div
        className={`
    flex
    h-dvh
    flex-col
    overflow-hidden
    transition-all
    duration-300
    ${sidebarCollapsed ? "lg:ml-24" : "lg:ml-72"}
  `}
      >
        {/* Navbar */}

        <Navbar
          sidebarCollapsed={sidebarCollapsed}
          onMenuClick={() => setSidebarOpen(true)}
          onSettings={() => setSettingsOpen(true)}
        />

        {/* Page */}

        <main
          className="
    flex-1
    min-h-0
    overflow-y-auto
    bg-slate-950
    px-4
    py-6
    sm:px-6
    lg:px-8
  "
        >
          <Outlet />
        </main>
      </div>

      {/* Settings */}

      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}
