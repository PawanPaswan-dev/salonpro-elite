"use client";

import { useState, Fragment } from "react";
import { Check, ArrowRight } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import GoldButton from "@/components/ui/GoldButton";
import { SERVICES, type Service, randInt } from "@/data/demoData";
import { fmtINR } from "@/lib/utils";

interface BookingData {
  service: Service | null;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
}

const TIMES = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

export default function BookingFlow() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BookingData>({
    service: null,
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
  });
  const [bookingId] = useState(() => `#SP${randInt(10000, 99999)}`);

  if (step === 4) {
    return (
      <GlassCard className="p-10 max-w-lg mx-auto text-center fade-in">
        <div className="w-20 h-20 rounded-full bg-emerald-400/10 flex items-center justify-center mx-auto mb-5">
          <Check size={40} className="text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Appointment Confirmed!</h2>
        <p className="text-white/50 mb-6">
          Booking ID: <span className="text-gold font-mono">{bookingId}</span>
        </p>
        <GlassCard className="p-5 text-left space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-white/40">Service</span>
            <span className="text-white font-medium">{data.service?.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/40">Date & Time</span>
            <span className="text-white font-medium">
              {data.date} at {data.time}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/40">Price</span>
            <span className="text-gold font-bold">{fmtINR(data.service?.price || 0)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/40">Customer</span>
            <span className="text-white font-medium">{data.name}</span>
          </div>
        </GlassCard>
        <GoldButton
          onClick={() => {
            setStep(1);
            setData({ service: null, date: "", time: "", name: "", phone: "", email: "" });
          }}
          className="w-full"
        >
          Book Another
        </GoldButton>
      </GlassCard>
    );
  }

  return (
    <>
      {/* Stepper */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {["Service", "Date & Time", "Your Details"].map((label, i) => (
          <Fragment key={i}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                  step > i + 1
                    ? "bg-gold border-gold text-black"
                    : step === i + 1
                    ? "border-gold text-gold"
                    : "border-white/15 text-white/30"
                }`}
              >
                {step > i + 1 ? <Check size={16} /> : i + 1}
              </div>
              <span className={`text-xs ${step === i + 1 ? "text-white" : "text-white/30"}`}>{label}</span>
            </div>
            {i < 2 && <div className={`w-12 h-px ${step > i + 1 ? "bg-gold" : "bg-white/10"} mb-5`} />}
          </Fragment>
        ))}
      </div>

      <GlassCard className="p-8">
        {step === 1 && (
          <>
            <h3 className="text-white font-bold text-lg mb-5">Select a Service</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setData({ ...data, service: s })}
                  className={`text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${
                    data.service?.id === s.id ? "border-gold bg-gold/10" : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <s.icon size={18} className="text-gold" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-sm font-medium">{s.name}</div>
                    <div className="text-white/40 text-xs">{s.duration} mins</div>
                  </div>
                  <div className="text-gold font-bold text-sm">{fmtINR(s.price)}</div>
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <GoldButton onClick={() => data.service && setStep(2)}>
                Continue <ArrowRight size={15} />
              </GoldButton>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="text-white font-bold text-lg mb-5">Choose Date & Time</h3>
            <label className="text-white/50 text-sm block mb-2">Select Date</label>
            <input
              type="date"
              value={data.date}
              min="2026-06-14"
              onChange={(e) => setData({ ...data, date: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white mb-5 outline-none focus:border-gold/50"
            />
            <label className="text-white/50 text-sm block mb-2">Select Time Slot</label>
            <div className="grid grid-cols-5 gap-2">
              {TIMES.map((t) => (
                <button
                  key={t}
                  onClick={() => setData({ ...data, time: t })}
                  className={`py-2.5 rounded-lg text-sm border transition-all ${
                    data.time === t ? "border-gold bg-gold/10 text-gold" : "border-white/10 text-white/60 hover:border-white/30"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <GoldButton variant="outline" onClick={() => setStep(1)}>
                Back
              </GoldButton>
              <GoldButton onClick={() => data.date && data.time && setStep(3)}>
                Continue <ArrowRight size={15} />
              </GoldButton>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="text-white font-bold text-lg mb-5">Your Details</h3>
            <div className="space-y-4">
              <input
                placeholder="Full Name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold/50"
              />
              <input
                placeholder="Phone Number"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold/50"
              />
              <input
                placeholder="Email Address"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold/50"
              />
            </div>
            <GlassCard className="p-4 mt-5 flex justify-between items-center">
              <div>
                <div className="text-white text-sm font-medium">{data.service?.name}</div>
                <div className="text-white/40 text-xs">
                  {data.date} • {data.time}
                </div>
              </div>
              <div className="text-gold font-bold">{fmtINR(data.service?.price || 0)}</div>
            </GlassCard>
            <div className="flex justify-between mt-6">
              <GoldButton variant="outline" onClick={() => setStep(2)}>
                Back
              </GoldButton>
              <GoldButton onClick={() => data.name && data.phone && setStep(4)}>
                Confirm Booking <Check size={15} />
              </GoldButton>
            </div>
          </>
        )}
      </GlassCard>
    </>
  );
}
