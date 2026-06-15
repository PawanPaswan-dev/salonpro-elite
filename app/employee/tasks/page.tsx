import { ClipboardList, Check, Clock } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import StatCard from "@/components/dashboard/StatCard";
import { CURRENT_EMPLOYEE } from "@/data/demoData";

export const metadata = {
  title: "Daily Tasks | SalonPro Elite Employee Portal",
};

const TASK_NAMES = [
  "Morning client consultations",
  "Restock styling station",
  "Sanitize tools & workspace",
  "Complete client color formula log",
  "Inventory check-in",
  "Team briefing",
  "End-of-day cleanup",
  "Update client records",
];

export default function EmployeeTasksPage() {
  const e = CURRENT_EMPLOYEE;

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard icon={ClipboardList} label="Tasks Today" value={e.tasksToday} />
        <StatCard icon={Check} label="Completed" value={e.tasksDone} change={`${Math.round((e.tasksDone / e.tasksToday) * 100)}%`} />
        <StatCard icon={Clock} label="Pending" value={e.tasksToday - e.tasksDone} changeType="down" />
      </div>
      <GlassCard className="p-6">
        <h3 className="text-white font-semibold mb-4">Today&apos;s Task List</h3>
        <div className="space-y-2">
          {TASK_NAMES.slice(0, e.tasksToday).map((t, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                  i < e.tasksDone ? "bg-gold border-gold" : "border-white/20"
                }`}
              >
                {i < e.tasksDone && <Check size={13} className="text-black" />}
              </div>
              <span className={`text-sm ${i < e.tasksDone ? "text-white/40 line-through" : "text-white"}`}>{t}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
