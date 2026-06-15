import { DollarSign, TrendingUp, Award, Users, Crown, Gem, Package, Calendar } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import GlassCard from "@/components/ui/GlassCard";
import RevenueAreaChart from "@/components/charts/RevenueAreaChart";
import CustomerGrowthChart from "@/components/charts/CustomerGrowthChart";
import ServicePopularityChart from "@/components/charts/ServicePopularityChart";
import StaffPerformanceChart from "@/components/charts/StaffPerformanceChart";
import {
  TOTAL_REVENUE,
  TOTAL_PROFIT,
  REVENUE_MONTHLY,
  ACTIVE_CUSTOMERS,
  CUSTOMERS,
  MEMBERSHIP_SALES,
  INVENTORY,
  APPOINTMENTS,
  SERVICE_POPULARITY,
  STAFF_PERFORMANCE,
} from "@/data/demoData";
import { fmtINR } from "@/lib/utils";

export const metadata = {
  title: "Owner Dashboard | SalonPro Elite",
};

export default function OwnerOverviewPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={DollarSign} label="Total Revenue (6 mo)" value={fmtINR(TOTAL_REVENUE)} change="+12.4%" />
        <StatCard icon={TrendingUp} label="This Month's Revenue" value={fmtINR(REVENUE_MONTHLY[5].revenue)} change="+6.4%" />
        <StatCard icon={Award} label="Net Profit (6 mo)" value={fmtINR(TOTAL_PROFIT)} change="+9.1%" />
        <StatCard
          icon={Users}
          label="Active Customers"
          value={ACTIVE_CUSTOMERS}
          change="+8.2%"
          sub={`of ${CUSTOMERS.length} total members`}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Crown} label="Gold Memberships Sold" value={MEMBERSHIP_SALES.Gold} change="+4" />
        <StatCard icon={Gem} label="Platinum Memberships" value={MEMBERSHIP_SALES.Platinum} change="+2" />
        <StatCard
          icon={Package}
          label="Inventory Alerts"
          value={INVENTORY.filter((i) => i.stock <= i.reorder).length}
          changeType="down"
          change={`${INVENTORY.filter((i) => i.stock === 0).length} out of stock`}
        />
        <StatCard icon={Calendar} label="Total Appointments" value={APPOINTMENTS.length} sub="Last 6 months" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Revenue Growth</h3>
            <span className="text-xs text-white/40">Monthly, ₹</span>
          </div>
          <RevenueAreaChart data={REVENUE_MONTHLY} />
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Customer Growth</h3>
            <span className="text-xs text-white/40">New + returning</span>
          </div>
          <CustomerGrowthChart data={REVENUE_MONTHLY} />
        </GlassCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Service Popularity</h3>
            <span className="text-xs text-white/40">By bookings</span>
          </div>
          <ServicePopularityChart data={SERVICE_POPULARITY.slice(0, 5)} />
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Staff Performance</h3>
            <span className="text-xs text-white/40">Revenue generated</span>
          </div>
          <StaffPerformanceChart data={STAFF_PERFORMANCE} />
        </GlassCard>
      </div>
    </div>
  );
}
