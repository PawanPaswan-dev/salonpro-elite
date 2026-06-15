import { Wallet, History, DollarSign, Calendar, Crown } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import StatCard from "@/components/dashboard/StatCard";
import { CURRENT_CUSTOMER, APPOINTMENTS } from "@/data/demoData";
import { fmtINR, initials } from "@/lib/utils";

export const metadata = {
  title: "Dashboard | SalonPro Elite Customer Portal",
};

export default function CustomerOverviewPage() {
  const c = CURRENT_CUSTOMER;
  const history = APPOINTMENTS.filter((a) => a.customerId === c.id).slice(0, 5);

  return (
    <div className="space-y-6">
      <GlassCard className="p-6 flex flex-wrap items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center text-gold font-bold text-xl">
          {initials(c.name)}
        </div>
        <div>
          <h2 className="text-white font-bold text-lg">{c.name}</h2>
          <p className="text-white/40 text-sm">
            {c.tier} Member since {c.memberSince}
          </p>
        </div>
        <div className="ml-auto px-4 py-2 rounded-xl bg-gold/10 border border-gold/20 flex items-center gap-2">
          <Crown size={16} className="text-gold" />
          <span className="text-gold font-semibold text-sm">{c.tier} Tier</span>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Wallet} label="Loyalty Points" value={c.loyaltyPoints.toLocaleString()} />
        <StatCard icon={History} label="Total Visits" value={c.visits} />
        <StatCard icon={DollarSign} label="Total Spent" value={fmtINR(c.totalSpent)} />
        <StatCard icon={Calendar} label="Last Visit" value={c.lastVisit} />
      </div>

      <GlassCard className="p-6">
        <h3 className="text-white font-semibold mb-4">Appointment History</h3>
        <div className="space-y-2">
          {history.length ? (
            history.map((a) => (
              <div key={a.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div>
                  <div className="text-white text-sm font-medium">{a.service}</div>
                  <div className="text-white/40 text-xs">
                    with {a.employee} • {a.date} at {a.time}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gold font-bold text-sm">{fmtINR(a.price)}</div>
                  <span
                    className={`text-xs ${
                      a.status === "Completed"
                        ? "text-emerald-400"
                        : a.status === "Cancelled"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {a.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white/40 text-sm">No appointment history yet.</p>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
