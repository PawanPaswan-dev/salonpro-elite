"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import GoldButton from "@/components/ui/GoldButton";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <GlassCard className="p-8">
      {sent ? (
        <div className="h-full flex flex-col items-center justify-center text-center py-16">
          <div className="w-16 h-16 rounded-full bg-emerald-400/10 flex items-center justify-center mb-4">
            <Check size={32} className="text-emerald-400" />
          </div>
          <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
          <p className="text-white/50 text-sm">Our team will get back to you within 24 hours.</p>
        </div>
      ) : (
        <>
          <h3 className="text-white font-bold text-lg mb-5">Send a Message</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="First Name"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold/50"
              />
              <input
                placeholder="Last Name"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold/50"
              />
            </div>
            <input
              placeholder="Email Address"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold/50"
            />
            <input
              placeholder="Phone Number"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold/50"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold/50 resize-none"
            />
            <GoldButton onClick={() => setSent(true)} className="w-full">
              Send Message
            </GoldButton>
          </div>
        </>
      )}
    </GlassCard>
  );
}
