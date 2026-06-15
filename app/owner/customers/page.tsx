import { Users, UserCheck, Crown } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import CustomerTable from "@/components/owner/CustomerTable";
import { CUSTOMERS, ACTIVE_CUSTOMERS, MEMBERSHIP_SALES } from "@/data/demoData";

export const metadata = {
  title: "Customers | SalonPro Elite Owner Dashboard",
};

export default function OwnerCustomersPage() {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard icon={Users} label="Total Customers" value={CUSTOMERS.length} />
        <StatCard icon={UserCheck} label="Active This Month" value={ACTIVE_CUSTOMERS} />
        <StatCard icon={Crown} label="Premium Members" value={MEMBERSHIP_SALES.Gold + MEMBERSHIP_SALES.Platinum} />
      </div>
      <CustomerTable />
    </div>
  );
}
