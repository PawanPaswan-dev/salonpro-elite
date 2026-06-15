import { Crown, Check } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import QRCodeBlock from "@/components/customer/QRCodeBlock";
import { CURRENT_CUSTOMER, MEMBERSHIP_PLANS } from "@/data/demoData";

export const metadata = {
  title: "Membership Card | SalonPro Elite Customer Portal",
};

export default function CustomerCardPage() {
  const c = CURRENT_CUSTOMER;
  const plan = MEMBERSHIP_PLANS.find((p) => p.name === c.tier);

  return (
    <div className="space-y-6">
      <GlassCard className="p-8 bg-gradient-to-br from-[#1a1408] to-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Crown size={22} className="text-gold" />
            <span className="text-white font-bold text-lg font-serif">SalonPro Elite</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-bold">
            {c.tier.toUpperCase()}
          </span>
        </div>
        <div className="mb-8">
          <div className="text-white/40 text-xs mb-1">Member Name</div>
          <div className="text-white font-semibold text-xl">{c.name}</div>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <div className="text-white/40 text-xs mb-1">Member ID</div>
            <div className="text-white font-mono">SP-{c.id}</div>
          </div>
          <QRCodeBlock value={`SALONPROELITE-MEMBER-SP-${c.id}`} />
        </div>
      </GlassCard>
      <GlassCard className="p-6">
        <h3 className="text-white font-semibold mb-4">{c.tier} Plan Benefits</h3>
        <div className="space-y-2">
          {plan?.benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-white/60 text-sm">
              <Check size={15} className="text-gold" /> {b}
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
