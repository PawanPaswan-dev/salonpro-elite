import { LayoutDashboard, ClipboardList } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import type { DashboardTab } from "@/components/dashboard/DashboardSidebar";

const tabs: DashboardTab[] = [
  {
    href: "/employee",
    label: "My Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/employee/tasks",
    label: "Daily Tasks",
    icon: ClipboardList,
  },
];

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell
      roleLabel="Employee Dashboard"
      avatarLabel="EM"
      tabs={tabs}
    >
      {children}
    </DashboardShell>
  );
}
