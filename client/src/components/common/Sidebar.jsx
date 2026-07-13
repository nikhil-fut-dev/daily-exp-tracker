import sidebarMenu from "../../config/sidebarMenu";

import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarSection from "./sidebar/SidebarSection";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
//import PremiumCard from "./sidebar/PremiumCard";
//import UserCard from "./sidebar/UserCard";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  sidebarCollapsed,
  toggleSidebar,
}) {
  const navItem =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium";

  useLockBodyScroll(sidebarOpen);
  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 touch-none lg:hidden"
        />
      )}

      <aside
        className={`
fixed
top-0
left-0
h-dvh
overflow-hidden
${sidebarCollapsed ? "lg:w-24" : "lg:w-72"}
bg-slate-900
border-r
border-slate-800
flex
flex-col
z-50
transform
transition-all
duration-300

${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

lg:translate-x-0
`}
      >
        {/* Logo */}

        <SidebarHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          sidebarCollapsed={sidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />

        {/* Navigation */}

        <nav
          className="flex-1 overflow-y-auto overscroll-contain px-4 py-6"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {sidebarMenu.map((section) => (
            <SidebarSection
              key={section.id}
              section={section}
              navItem={navItem}
              sidebarCollapsed={sidebarCollapsed}
            />
          ))}
        </nav>

        {/* Upgrade Card */}

        {/*<PremiumCard sidebarCollapsed={sidebarCollapsed} />*/}

        {/* Logout */}

        {/*<UserCard sidebarCollapsed={sidebarCollapsed} />*/}
      </aside>
    </>
  );
}
