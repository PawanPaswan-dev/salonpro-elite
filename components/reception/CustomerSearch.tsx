"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { CUSTOMERS } from "@/data/demoData";
import { initials } from "@/lib/utils";

export default function CustomerSearch() {
  const [search, setSearch] = useState("");
  const filtered = search
    ? CUSTOMERS.filter(
        (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
      )
    : CUSTOMERS.slice(0, 10);

  return (
    <GlassCard className="p-6">
      <h3 className="text-white font-semibold mb-4">Customer Search & Check-in</h3>
      <div className="relative mb-5">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or phone..."
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white outline-none focus:border-gold/50"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {filtered.map((c) => (
          <div key={c.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-gold font-bold text-sm">
                {initials(c.name)}
              </div>
              <div>
                <div className="text-white text-sm font-medium">{c.name}</div>
                <div className="text-white/40 text-xs">
                  {c.phone} • {c.tier} Member
                </div>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-gold/10 text-gold text-xs font-semibold hover:bg-gold/20 transition-colors">
              Check In
            </button>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
