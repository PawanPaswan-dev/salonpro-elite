"use client";

import { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import GoldButton from "@/components/ui/GoldButton";
import StarRating from "@/components/ui/StarRating";
import { REVIEWS } from "@/data/demoData";
import { initials } from "@/lib/utils";

export default function ReviewsList() {
  const [visible, setVisible] = useState(12);

  return (
    <>
      <div className="grid md:grid-cols-3 gap-5">
        {REVIEWS.slice(0, visible).map((r) => (
          <GlassCard key={r.id} className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-gold font-bold text-sm">
                  {initials(r.name)}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{r.name}</div>
                  <div className="text-white/30 text-xs">{r.date}</div>
                </div>
              </div>
              <StarRating rating={r.rating} />
            </div>
            <div className="text-gold text-xs font-medium mb-2">{r.service}</div>
            <p className="text-white/55 text-sm leading-relaxed">{r.text}</p>
          </GlassCard>
        ))}
      </div>
      {visible < REVIEWS.length && (
        <div className="text-center mt-10">
          <GoldButton variant="outline" onClick={() => setVisible((v) => v + 12)}>
            Load More Reviews
          </GoldButton>
        </div>
      )}
    </>
  );
}
