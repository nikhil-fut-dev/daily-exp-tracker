import UserDropdown from "./UserDropdown";
import NavbarLeft from "./navbar/NavbarLeft";
import SearchBar from "./navbar/SearchBar";
import ThemeToggle from "./navbar/ThemeToggle";
import NotificationDropdown from "./navbar/NotificationDropdown";

export default function Navbar({ onMenuClick, onSettings }) {
  return (
    <header className="sticky top-0 z-30 h-16 sm:h-20 bg-slate-900/70 backdrop-blur-lg border-b border-slate-800 flex items-center justify-between px-3 sm:px-6">
      <NavbarLeft onMenuClick={onMenuClick} />

      <div className="flex items-center gap-4">
        <SearchBar />

        <NotificationDropdown />

        <ThemeToggle />

        <UserDropdown onSettings={onSettings} />
      </div>
    </header>
  );
}
