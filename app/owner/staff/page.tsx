import { Users, Award, Target } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import GlassCard from "@/components/ui/GlassCard";
import StarRating from "@/components/ui/StarRating";
import { EMPLOYEES } from "@/data/demoData";
import { fmtINR } from "@/lib/utils";

export const metadata = {
  title: "Staff | SalonPro Elite Owner Dashboard",
};

export default function OwnerStaffPage() {
  const avgRating = (EMPLOYEES.reduce((a, e) => a + parseFloat(e.rating), 0) / EMPLOYEES.length).toFixed(1);
  const avgAchievement = Math.round(
    EMPLOYEES.reduce((a, e) => a + (e.achieved / e.target) * 100, 0) / EMPLOYEES.length
  );

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard icon={Users} label="Total Staff" value={EMPLOYEES.length} />
        <StatCard icon={Award} label="Avg Rating" value={avgRating} />
        <StatCard icon={Target} label="Avg Target Achievement" value={`${avgAchievement}%`} />
      </div>
      <GlassCard className="p-6">
        <h3 className="text-white font-semibold mb-4">Staff Directory</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 text-left border-b border-white/10">
                <th className="py-2 font-medium">Name</th>
                <th className="py-2 font-medium">Role</th>
                <th className="py-2 font-medium">Attendance</th>
                <th className="py-2 font-medium">Target Achieved</th>
                <th className="py-2 font-medium">Commission</th>
                <th className="py-2 font-medium">Rating</th>
              </tr>
            </thead>
            <tbody>
              {EMPLOYEES.map((e) => {
                const pct = Math.min(100, Math.round((e.achieved / e.target) * 100));
                return (
                  <tr key={e.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="py-3 text-white font-medium">{e.name}</td>
                    <td className="py-3 text-white/50">{e.role}</td>
                    <td className="py-3 text-white/70">{e.attendance}%</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full bg-gold" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-white/50 text-xs">{pct}%</span>
                      </div>
                    </td>
                    <td className="py-3 text-gold font-medium">{fmtINR(e.commission)}</td>
                    <td className="py-3">
                      <StarRating rating={Math.round(parseFloat(e.rating))} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
