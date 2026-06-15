import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: string;
  changeType?: "up" | "down";
  sub?: string;
}

export default function StatCard({ icon: Icon, label, value, change, changeType = "up", sub }: StatCardProps) {
  return (
    <GlassCard className="p-5 hover:border-gold/40 transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-start justify-between mb-3">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center group-hover:from-gold/30 transition-colors">
          <Icon size={20} className="text-gold" />
        </div>
        {change && (
          <span
            className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
              changeType === "up" ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"
            }`}
          >
            {changeType === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {change}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-white tracking-tight mb-1">{value}</div>
      <div className="text-sm text-white/50">{label}</div>
      {sub && <div className="text-xs text-white/30 mt-1">{sub}</div>}
    </GlassCard>
  );
}
