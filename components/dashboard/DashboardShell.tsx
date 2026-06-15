"use client";

import { Bell, Settings } from "lucide-react";
import DashboardSidebar, { type DashboardTab } from "@/components/dashboard/DashboardSidebar";
import { usePathname } from "next/navigation";

interface DashboardShellProps {
  roleLabel: string;
  avatarLabel: string;
  tabs: DashboardTab[];
  children: React.ReactNode;
}

export default function DashboardShell({ roleLabel, avatarLabel, tabs, children }: DashboardShellProps) {
  const pathname = usePathname();
  const current = tabs.find((t) => t.href === pathname) ?? tabs[0];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      <DashboardSidebar roleLabel={roleLabel} tabs={tabs} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center gap-3 md:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
              <span className="text-black font-bold text-xs">SE</span>
            </div>
            <span className="text-white font-bold text-sm">{roleLabel}</span>
          </div>
          <h1 className="text-white font-semibold hidden md:block">{current.label}</h1>
          <div className="flex items-center gap-4">
            <Bell size={18} className="text-white/40 hover:text-white cursor-pointer" />
            <Settings size={18} className="text-white/40 hover:text-white cursor-pointer" />
            <div className="w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center text-gold font-bold text-sm">
              {avatarLabel}
            </div>
          </div>
        </header>

        {/* Mobile tabs */}
        <div className="md:hidden flex overflow-x-auto gap-2 p-3 border-b border-white/10 bg-black">
          {tabs.map((t) => {
            const active = pathname === t.href;
            return (
              <a
                key={t.href}
                href={t.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium shrink-0 ${
                  active
                    ? "bg-gold/10 text-gold border border-gold/30"
                    : "text-white/50 border border-white/10"
                }`}
              >
                <t.icon size={14} /> {t.label}
              </a>
            );
          })}
        </div>

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden fade-in">{children}</main>
      </div>
    </div>
  );
}
