"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { CUSTOMERS } from "@/data/demoData";
import { fmtINR } from "@/lib/utils";

export default function CustomerTable() {
  const [search, setSearch] = useState("");
  const filtered = CUSTOMERS.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  ).slice(0, 20);

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Customer Database</h3>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-gold/50 w-56"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-white/40 text-left border-b border-white/10">
              <th className="py-2 font-medium">Customer</th>
              <th className="py-2 font-medium">Tier</th>
              <th className="py-2 font-medium">Visits</th>
              <th className="py-2 font-medium">Total Spent</th>
              <th className="py-2 font-medium">Points</th>
              <th className="py-2 font-medium">Last Visit</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="py-3">
                  <div className="text-white font-medium">{c.name}</div>
                  <div className="text-white/30 text-xs">{c.phone}</div>
                </td>
                <td className="py-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      c.tier === "Platinum"
                        ? "bg-gold/15 text-gold"
                        : c.tier === "Gold"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-white/5 text-white/50"
                    }`}
                  >
                    {c.tier}
                  </span>
                </td>
                <td className="py-3 text-white/70">{c.visits}</td>
                <td className="py-3 text-white/70">{fmtINR(c.totalSpent)}</td>
                <td className="py-3 text-gold font-medium">{c.loyaltyPoints}</td>
                <td className="py-3 text-white/40">{c.lastVisit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
