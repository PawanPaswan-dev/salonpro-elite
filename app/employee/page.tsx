import { UserCheck, Users, ClipboardList, DollarSign } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import StatCard from "@/components/dashboard/StatCard";
import StarRating from "@/components/ui/StarRating";
import { CURRENT_EMPLOYEE, APPOINTMENTS } from "@/data/demoData";
import { fmtINR, initials } from "@/lib/utils";

export const metadata = {
  title: "My Dashboard | SalonPro Elite Employee Portal",
};

export default function EmployeeOverviewPage() {
  const e = CURRENT_EMPLOYEE;
  const empAppointments = APPOINTMENTS.filter((a) => a.employee === e.name).slice(0, 8);
  const pct = Math.min(100, Math.round((e.achieved / e.target) * 100));

  return (
    <div className="space-y-6">
      <GlassCard className="p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center text-gold font-bold text-xl">
          {initials(e.name)}
        </div>
        <div>
          <h2 className="text-white font-bold text-lg">{e.name}</h2>
          <p className="text-white/40 text-sm">
            {e.role} • Employee ID: EMP{String(e.id).padStart(3, "0")}
          </p>
        </div>
        <div className="ml-auto text-right">
          <div className="flex items-center gap-1 justify-end">
            <StarRating rating={Math.round(parseFloat(e.rating))} />
          </div>
          <div className="text-white/40 text-xs mt-1">Performance Rating: {e.rating}/5</div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={UserCheck} label="Attendance This Month" value={`${e.attendance}%`} change="On track" />
        <StatCard icon={Users} label="Assigned Customers" value={e.customers} />
        <StatCard icon={ClipboardList} label="Daily Tasks" value={`${e.tasksDone}/${e.tasksToday}`} sub="Completed today" />
        <StatCard icon={DollarSign} label="Commission Earned" value={fmtINR(e.commission)} change="+8%" />
      </div>

      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Target Achievement</h3>
          <span className="text-gold font-bold">{pct}%</span>
        </div>
        <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden mb-2">
          <div className="h-full bg-gradient-to-r from-gold to-gold-dark rounded-full" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex justify-between text-sm text-white/40">
          <span>Achieved: {fmtINR(e.achieved)}</span>
          <span>Target: {fmtINR(e.target)}</span>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="text-white font-semibold mb-4">Assigned Appointments</h3>
        <div className="space-y-2">
          {empAppointments.map((a) => (
            <div key={a.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div>
                <div className="text-white text-sm font-medium">{a.customer}</div>
                <div className="text-white/40 text-xs">
                  {a.service} • {a.date} at {a.time}
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
