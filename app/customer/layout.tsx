import { LayoutDashboard, CreditCard, Wallet } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import type { DashboardTab } from "@/components/dashboard/DashboardSidebar";

export const CUSTOMER_TABS: DashboardTab[] = [
  { href: "/customer", label: "Dashboard", icon: LayoutDashboard },
  { href: "/customer/card", label: "Membership Card", icon: CreditCard },
  { href: "/customer/wallet", label: "Digital Wallet", icon: Wallet },
];

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell roleLabel="Customer Portal" avatarLabel="CU" tabs={CUSTOMER_TABS}>
      {children}
    </DashboardShell>
  );
}
