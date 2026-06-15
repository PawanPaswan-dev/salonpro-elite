"use client";

import { useState } from "react";
import { Star, Check } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import GoldButton from "@/components/ui/GoldButton";

export default function ReviewSubmitForm() {
  const [form, setForm] = useState({ name: "", rating: 5, text: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <GlassCard className="p-8 mb-14">
      <h3 className="text-white font-bold text-lg mb-4">Submit Your Review</h3>
      {submitted ? (
        <div className="flex items-center gap-3 text-emerald-400 bg-emerald-400/10 rounded-xl p-4">
          <Check size={20} /> Thank you! Your review has been submitted for approval.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your Name"
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold/50"
          />
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
            <span className="text-white/50 text-sm mr-2">Rating:</span>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={20}
                onClick={() => setForm({ ...form, rating: i })}
                className={`cursor-pointer ${i <= form.rating ? "fill-gold text-gold" : "text-white/20"}`}
              />
            ))}
          </div>
          <textarea
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            placeholder="Share your experience..."
            rows={3}
            className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold/50 resize-none"
          />
          <GoldButton
            onClick={() => form.name && form.text && setSubmitted(true)}
            className="md:col-span-2"
          >
            Submit Review
          </GoldButton>
        </div>
      )}
    </GlassCard>
  );
}
