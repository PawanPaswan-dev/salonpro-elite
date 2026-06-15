import { DollarSign, Calendar, Target } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import GlassCard from "@/components/ui/GlassCard";
import StarRating from "@/components/ui/StarRating";
import DailyRevenueChart from "@/components/charts/DailyRevenueChart";
import WeeklyRevenueChart from "@/components/charts/WeeklyRevenueChart";
import RetentionChart from "@/components/charts/RetentionChart";
import PopularServicesChart from "@/components/charts/PopularServicesChart";
import { REVENUE_DAILY, REVENUE_WEEKLY, RETENTION, SERVICE_POPULARITY, EMPLOYEES } from "@/data/demoData";
import { fmtINR, initials } from "@/lib/utils";

export const metadata = {
  title: "Analytics | SalonPro Elite Owner Dashboard",
};

export default function OwnerAnalyticsPage() {
  const bestEmployees = [...EMPLOYEES].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard icon={DollarSign} label="Today's Revenue" value={fmtINR(REVENUE_DAILY[13].revenue)} change="+5.2%" />
        <StatCard icon={Calendar} label="This Week" value={fmtINR(REVENUE_WEEKLY[3].revenue)} change="+5.1%" />
        <StatCard icon={Target} label="Retention Rate" value={`${RETENTION[5].retention}%`} change="+2pts" />
      </div>

      <GlassCard className="p-6">
        <h3 className="text-white font-semibold mb-4">Daily Revenue (Last 14 Days)</h3>
        <DailyRevenueChart data={REVENUE_DAILY} />
      </GlassCard>

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-white font-semibold mb-4">Weekly Revenue Trend</h3>
          <WeeklyRevenueChart data={REVENUE_WEEKLY} />
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="text-white font-semibold mb-4">Customer Retention</h3>
          <RetentionChart data={RETENTION} />
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h3 className="text-white font-semibold mb-4">Most Popular Services</h3>
        <PopularServicesChart data={SERVICE_POPULARITY} />
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="text-white font-semibold mb-4">Best Employees (Rating)</h3>
        <div className="space-y-3">
          {bestEmployees.map((e, i) => (
            <div key={e.id} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold text-sm">
                {i + 1}
              </div>
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/60 text-xs font-bold">
                {initials(e.name)}
              </div>
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{e.name}</div>
                <div className="text-white/40 text-xs">{e.role}</div>
              </div>
              <StarRating rating={Math.round(parseFloat(e.rating))} />
              <span className="text-gold font-bold text-sm w-10 text-right">{e.rating}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
