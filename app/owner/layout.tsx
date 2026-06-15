import { LayoutDashboard, BarChart3, Users, Package, Briefcase } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import type { DashboardTab } from "@/components/dashboard/DashboardSidebar";

export const OWNER_TABS: DashboardTab[] = [
  { href: "/owner", label: "Overview", icon: LayoutDashboard },
  { href: "/owner/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/owner/customers", label: "Customers", icon: Users },
  { href: "/owner/inventory", label: "Inventory", icon: Package },
  { href: "/owner/staff", label: "Staff", icon: Briefcase },
];

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell roleLabel="Owner Dashboard" avatarLabel="AD" tabs={OWNER_TABS}>
      {children}
    </DashboardShell>
  );
}
