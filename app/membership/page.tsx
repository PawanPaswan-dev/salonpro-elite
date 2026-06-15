import Link from "next/link";
import { Check } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import GoldButton from "@/components/ui/GoldButton";
import SectionHeading from "@/components/ui/SectionHeading";
import { MEMBERSHIP_PLANS, MEMBERSHIP_SALES } from "@/data/demoData";

export const metadata = {
  title: "Membership Plans | SalonPro Elite",
};

export default function MembershipPage() {
  return (
    <div className="bg-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Membership"
          title="Choose Your Tier"
          subtitle="Unlock exclusive discounts, rewards and VIP perks designed for every level of indulgence."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {MEMBERSHIP_PLANS.map((plan) => (
            <GlassCard
              key={plan.name}
              className={`p-8 relative transition-all hover:-translate-y-2 ${
                plan.featured
                  ? "border-gold shadow-[0_0_50px_rgba(212,175,55,0.15)] scale-[1.03]"
                  : "hover:border-gold/40"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold text-black text-xs font-bold tracking-wide">
                  MOST POPULAR
                </div>
              )}
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <plan.icon size={30} className="text-gold" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1 font-serif">{plan.name}</h3>
                <div className="text-4xl font-bold text-gold mt-3">₹{plan.price.toLocaleString("en-IN")}</div>
                <div className="text-white/40 text-xs mt-1">per year</div>
              </div>
              <div className="space-y-3 mb-8">
                {plan.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2 text-white/60 text-sm">
                    <Check size={16} className="text-gold shrink-0 mt-0.5" /> {b}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <div className="text-gold font-bold">{plan.discount}</div>
                  <div className="text-white/40 text-xs">Discount</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <div className="text-gold font-bold">{plan.points}</div>
                  <div className="text-white/40 text-xs">Reward Pts</div>
                </div>
              </div>
              <Link href="/book">
                <GoldButton className="w-full" variant={plan.featured ? "filled" : "outline"}>
                  Choose {plan.name}
                </GoldButton>
              </Link>
            </GlassCard>
          ))}
        </div>
        <GlassCard className="mt-12 p-8 grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-white mb-1">{MEMBERSHIP_SALES.Silver}</div>
            <div className="text-white/40 text-sm">Silver Members</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white mb-1">{MEMBERSHIP_SALES.Gold}</div>
            <div className="text-white/40 text-sm">Gold Members</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white mb-1">{MEMBERSHIP_SALES.Platinum}</div>
            <div className="text-white/40 text-sm">Platinum Members</div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
