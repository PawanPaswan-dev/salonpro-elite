"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crown, LogOut, type LucideIcon } from "lucide-react";

export interface DashboardTab {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface DashboardSidebarProps {
  roleLabel: string;
  tabs: DashboardTab[];
}

export default function DashboardSidebar({ roleLabel, tabs }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-black border-r border-white/10 flex flex-col shrink-0 hidden md:flex">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
            <Crown size={20} className="text-black" />
          </div>
          <div>
            <div className="text-white font-bold text-sm font-serif">SalonPro Elite</div>
            <div className="text-gold text-[10px] tracking-widest uppercase">{roleLabel}</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {tabs.map((t) => {
          const active = pathname === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-gold/10 text-gold border border-gold/20"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <t.icon size={18} /> {t.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/50 hover:text-red-400 hover:bg-red-400/5 transition-all"
        >
          <LogOut size={18} /> Logout
        </Link>
      </div>
    </aside>
  );
}
