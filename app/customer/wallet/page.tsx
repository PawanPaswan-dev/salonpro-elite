import { Wallet, Star, Award } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import StatCard from "@/components/dashboard/StatCard";
import { CURRENT_CUSTOMER, APPOINTMENTS } from "@/data/demoData";
import { fmtINR } from "@/lib/utils";

export const metadata = {
  title: "Digital Wallet | SalonPro Elite Customer Portal",
};

export default function CustomerWalletPage() {
  const c = CURRENT_CUSTOMER;
  const balance = Math.round(c.totalSpent * 0.05);
  const transactions = APPOINTMENTS.filter((a) => a.customerId === c.id).slice(0, 6);

  return (
    <div className="space-y-6">
      <GlassCard className="p-8 bg-gradient-to-br from-[#1a1408] to-black flex items-center justify-between">
        <div>
          <div className="text-white/40 text-sm mb-1">Digital Wallet Balance</div>
          <div className="text-3xl font-bold text-gold">{fmtINR(balance)}</div>
        </div>
        <Wallet size={48} className="text-gold/40" />
      </GlassCard>

      <div className="grid sm:grid-cols-2 gap-4">
        <StatCard icon={Star} label="Loyalty Points" value={c.loyaltyPoints.toLocaleString()} sub="100 pts = ₹100 wallet credit" />
        <StatCard icon={Award} label="Membership Tier" value={c.tier} />
      </div>

      <GlassCard className="p-6">
        <h3 className="text-white font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-2">
          {transactions.length ? (
            transactions.map((a) => (
              <div key={a.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div>
                  <div className="text-white text-sm font-medium">{a.service}</div>
                  <div className="text-white/40 text-xs">{a.date}</div>
                </div>
                <div className="text-red-400 font-semibold text-sm">-{fmtINR(a.price)}</div>
              </div>
            ))
          ) : (
            <p className="text-white/40 text-sm">No transactions yet.</p>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
