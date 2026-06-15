import { Calendar, Users, UserCheck, Clock } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import GlassCard from "@/components/ui/GlassCard";
import { APPOINTMENTS } from "@/data/demoData";

export const metadata = {
  title: "Front Desk | SalonPro Elite Reception",
};

export default function ReceptionOverviewPage() {
  const today = APPOINTMENTS.filter((a) => a.month === 6).slice(0, 12);
  const walkins = 7;
  const checkins = 18;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Calendar} label="Today's Appointments" value={today.length + 14} />
        <StatCard icon={Users} label="Walk-ins Today" value={walkins} change="+2" />
        <StatCard icon={UserCheck} label="Checked In" value={checkins} sub="of 24 total" />
        <StatCard icon={Clock} label="Avg Wait Time" value="8 min" changeType="up" change="-2 min" />
      </div>
      <GlassCard className="p-6">
        <h3 className="text-white font-semibold mb-4">Today&apos;s Schedule</h3>
        <div className="space-y-2">
          {today.map((a) => (
            <div key={a.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-3">
                <div className="text-gold font-bold text-sm w-14">{a.time}</div>
                <div>
                  <div className="text-white text-sm font-medium">{a.customer}</div>
                  <div className="text-white/40 text-xs">
                    {a.service} with {a.employee.split(" ")[0]}
                  </div>
                </div>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  a.status === "Completed"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : a.status === "Cancelled"
                    ? "bg-red-500/10 text-red-400"
                    : "bg-yellow-500/10 text-yellow-400"
                }`}
              >
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
