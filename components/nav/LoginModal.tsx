"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Crown, X, Briefcase, ClipboardList, Users } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import GoldButton from "@/components/ui/GoldButton";
import { DEMO_CREDENTIALS, type DemoCredential } from "@/data/demoData";

const ROLE_ICONS: Record<DemoCredential["role"], any> = {
  owner: Crown,
  employee: Briefcase,
  reception: ClipboardList,
  customer: Users,
};

const ROLE_ROUTES: Record<DemoCredential["role"], string> = {
  owner: "/owner",
  employee: "/employee",
  reception: "/reception",
  customer: "/customer",
};

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [role, setRole] = useState<DemoCredential["role"]>("owner");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const current = DEMO_CREDENTIALS.find((c) => c.role === role)!;

  const handleLogin = () => {
    if (email === current.email && pass === current.pass) {
      router.push(ROLE_ROUTES[role]);
      onClose();
    } else {
      setError("Invalid credentials. Use the demo credentials shown below.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0a0a0a] border border-gold/20 rounded-3xl max-w-md w-full p-8 relative shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-white/40 hover:text-white">
          <X size={22} />
        </button>
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mx-auto mb-3">
            <Crown size={26} className="text-black" />
          </div>
          <h2 className="text-white font-bold text-xl">Portal Login</h2>
          <p className="text-white/40 text-sm">Access your SalonPro Elite dashboard</p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-5">
          {DEMO_CREDENTIALS.map((c) => {
            const Icon = ROLE_ICONS[c.role];
            return (
              <button
                key={c.role}
                onClick={() => {
                  setRole(c.role);
                  setEmail("");
                  setPass("");
                  setError("");
                }}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all ${
                  role === c.role
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-white/10 text-white/50 hover:border-white/25"
                }`}
              >
                <Icon size={18} /> {c.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-3 mb-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold/50"
          />
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-gold/50"
          />
        </div>
        {error && <div className="text-red-400 text-xs mb-3">{error}</div>}
        <GoldButton onClick={handleLogin} className="w-full mb-4">
          Login to Dashboard
        </GoldButton>

        <GlassCard className="p-4 text-xs text-white/50 space-y-1">
          <div className="text-gold font-semibold mb-1">Demo Credentials</div>
          <div>
            Email: <span className="text-white">{current.email}</span>
          </div>
          <div>
            Password: <span className="text-white">{current.pass}</span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
