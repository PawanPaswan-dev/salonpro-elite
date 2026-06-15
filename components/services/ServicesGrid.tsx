"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Flame, Check, ArrowRight } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import GoldButton from "@/components/ui/GoldButton";
import { SERVICES } from "@/data/demoData";
import { fmtINR } from "@/lib/utils";

export default function ServicesGrid() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(SERVICES.map((s) => s.category)))];
  const filtered = filter === "All" ? SERVICES : SERVICES.filter((s) => s.category === filter);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
              filter === c
                ? "bg-gold text-black border-gold"
                : "border-white/15 text-white/60 hover:border-gold/40 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((s) => (
          <GlassCard key={s.id} className="p-7 hover:border-gold/40 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <s.icon size={26} className="text-gold" />
              </div>
              <span className="px-3 py-1 rounded-full bg-white/5 text-white/50 text-xs font-medium border border-white/10">
                {s.category}
              </span>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">{s.name}</h3>
            <div className="flex items-center gap-4 mb-4 text-sm">
              <span className="text-gold font-bold text-lg">{fmtINR(s.price)}</span>
              <span className="text-white/40 flex items-center gap-1">
                <Clock size={13} /> {s.duration} mins
              </span>
              <span className="text-white/40 flex items-center gap-1">
                <Flame size={13} /> {s.popularity}% popular
              </span>
            </div>
            <div className="space-y-2 mb-5">
              {s.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2 text-white/55 text-sm">
                  <Check size={15} className="text-gold shrink-0 mt-0.5" /> {b}
                </div>
              ))}
            </div>
            <Link href="/book">
              <GoldButton className="w-full">
                Book Now <ArrowRight size={14} />
              </GoldButton>
            </Link>
          </GlassCard>
        ))}
      </div>
    </>
  );
}
