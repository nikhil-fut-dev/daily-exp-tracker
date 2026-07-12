import {
  LayoutDashboard,
  Wallet,
  Receipt,
  WalletCards,
  FolderTree,
  FileText,
  Target,
  Repeat,
  CalendarDays,
  NotebookPen,
  Settings,
  CircleHelp,
} from "lucide-react";

const sidebarMenu = [
  {
    id: "main",
    title: "MAIN",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
      },
      {
        id: "income",
        label: "Income",
        icon: Wallet,
        path: "/income",
      },
      {
        id: "expense",
        label: "Expense",
        icon: Receipt,
        path: "/expense",
      },
      {
        id: "budgets",
        label: "Budgets",
        path: "/budgets",
        icon: WalletCards,
      },
      {
        id: "categories",
        label: "Categories",
        icon: FolderTree,
        path: "/categories",
      },
      {
        id: "reports",
        label: "Reports",
        icon: FileText,
        path: "/reports",
      },
    ],
  },

  {
    id: "tools",
    title: "TOOLS",
    items: [
      {
        id: "goals",
        label: "Goals",
        icon: Target,
        path: "/goals",
      },
      {
        id: "recurring",
        label: "Recurring",
        icon: Repeat,
        path: "/recurring",
        disabled: true,
      },
      {
        id: "calendar",
        label: "Calendar",
        icon: CalendarDays,
        path: "/calendar",
      },
      {
        id: "notes",
        label: "Notes",
        icon: NotebookPen,
        path: "/notes",
        disabled: true,
      },
    ],
  },

  {
    id: "other",
    title: "OTHER",
    items: [
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
        path: "/settings",
      },
      {
        id: "help",
        label: "Help & Support",
        icon: CircleHelp,
        path: "/help",
        disabled: true,
      },
    ],
  },
];

export default sidebarMenu;
