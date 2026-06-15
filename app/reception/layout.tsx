import { LayoutDashboard, Calendar, Search } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import type { DashboardTab } from "@/components/dashboard/DashboardSidebar";

export const RECEPTION_TABS: DashboardTab[] = [
  { href: "/reception", label: "Front Desk", icon: LayoutDashboard },
  { href: "/reception/appointments", label: "Appointments", icon: Calendar },
  { href: "/reception/customers", label: "Customer Search", icon: Search },
];

export default function ReceptionLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell roleLabel="Reception Dashboard" avatarLabel="RC" tabs={RECEPTION_TABS}>
      {children}
    </DashboardShell>
  );
}
