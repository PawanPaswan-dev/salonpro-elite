"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crown, Instagram, Facebook, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";
import { PUBLIC_PAGES } from "@/components/nav/TopNav";
import { SERVICES } from "@/data/demoData";

export default function Footer() {
  const pathname = usePathname();

  if (
    pathname?.startsWith("/owner") ||
    pathname?.startsWith("/employee") ||
    pathname?.startsWith("/reception") ||
    pathname?.startsWith("/customer")
  ) {
    return null;
  }

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
              <Crown size={18} className="text-black" />
            </div>
            <span className="text-white font-bold text-lg font-serif">SalonPro Elite</span>
          </div>
          <p className="text-white/40 text-sm leading-relaxed mb-4">
            Where luxury meets precision. Redefining grooming and beauty
            experiences for the modern individual since 2018.
          </p>
          <div className="flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/50 transition-colors cursor-pointer"
              >
                <Icon size={15} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-white font-semibold mb-4 text-sm tracking-wide">Quick Links</div>
          <div className="flex flex-col gap-2.5">
            {PUBLIC_PAGES.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="text-white/40 hover:text-gold text-sm text-left transition-colors"
              >
                {p.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="text-white font-semibold mb-4 text-sm tracking-wide">Our Services</div>
          <div className="flex flex-col gap-2.5">
            {SERVICES.slice(0, 6).map((s) => (
              <span key={s.id} className="text-white/40 text-sm">
                {s.name}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-white font-semibold mb-4 text-sm tracking-wide">Visit Us</div>
          <div className="flex flex-col gap-3 text-white/40 text-sm">
            <div className="flex gap-2">
              <MapPin size={16} className="text-gold shrink-0 mt-0.5" /> 14th Floor, Elite
              Towers, Park Street, Kolkata, WB 700016
            </div>
            <div className="flex gap-2">
              <Phone size={16} className="text-gold shrink-0 mt-0.5" /> +91 98300 12345
            </div>
            <div className="flex gap-2">
              <Mail size={16} className="text-gold shrink-0 mt-0.5" /> hello@salonproelite.in
            </div>
            <div className="flex gap-2">
              <Clock size={16} className="text-gold shrink-0 mt-0.5" /> Mon - Sun: 9:00 AM -
              9:00 PM
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-white/30 text-xs">
        <span>© 2026 SalonPro Elite. All rights reserved.</span>
        <span>Powered by SalonPro Elite ERP + CRM Platform</span>
      </div>
    </footer>
  );
}
