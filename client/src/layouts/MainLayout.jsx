import { Outlet } from "react-router-dom";
import { useState } from "react";
import SettingsModal from "../components/common/SettingsModal";

import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col lg:ml-72">
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
