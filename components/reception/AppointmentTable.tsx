"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { APPOINTMENTS } from "@/data/demoData";

export default function AppointmentTable() {
  const [search, setSearch] = useState("");
  const filtered = APPOINTMENTS.filter((a) =>
    a.customer.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 25);

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Appointment Management</h3>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer..."
            className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-gold/50 w-56"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-white/40 text-left border-b border-white/10">
              <th className="py-2 font-medium">Customer</th>
              <th className="py-2 font-medium">Service</th>
              <th className="py-2 font-medium">Stylist</th>
              <th className="py-2 font-medium">Date</th>
              <th className="py-2 font-medium">Time</th>
              <th className="py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="py-3 text-white font-medium">{a.customer}</td>
                <td className="py-3 text-white/50">{a.service}</td>
                <td className="py-3 text-white/50">{a.employee}</td>
                <td className="py-3 text-white/40">{a.date}</td>
                <td className="py-3 text-white/40">{a.time}</td>
                <td className="py-3">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
