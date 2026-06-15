"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crown, Menu, X, Calendar } from "lucide-react";
import GoldButton from "@/components/ui/GoldButton";
import LoginModal from "@/components/nav/LoginModal";

export const PUBLIC_PAGES = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/membership", label: "Membership" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Don't show public nav on dashboard routes
  if (
    pathname?.startsWith("/owner") ||
    pathname?.startsWith("/employee") ||
    pathname?.startsWith("/reception") ||
    pathname?.startsWith("/customer")
  ) {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg shadow-gold/20 group-hover:scale-110 transition-transform">
              <Crown size={20} className="text-black" />
            </div>
            <div className="leading-tight">
              <div className="text-white font-bold tracking-wide text-lg font-serif">
                SalonPro Elite
              </div>
              <div className="text-gold text-[10px] tracking-[0.25em] uppercase">
                Unisex Luxury Salon
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {PUBLIC_PAGES.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className={`text-sm font-medium tracking-wide transition-colors relative pb-1 ${
                  pathname === p.href ? "text-gold" : "text-white/70 hover:text-white"
                }`}
              >
                {p.label}
                {pathname === p.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setShowLogin(true)}
              className="text-sm text-white/70 hover:text-white font-medium transition-colors"
            >
              Staff / Admin Login
            </button>
            <Link href="/book">
              <GoldButton className="!py-2.5">
                <Calendar size={15} /> Book Appointment
              </GoldButton>
            </Link>
          </div>

          <button className="lg:hidden text-white" onClick={() => setOpen(!open)}>
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 mt-3 px-6 py-4 flex flex-col gap-3">
            {PUBLIC_PAGES.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                onClick={() => setOpen(false)}
                className={`text-left text-sm font-medium py-1 ${
                  pathname === p.href ? "text-gold" : "text-white/70"
                }`}
              >
                {p.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setShowLogin(true);
                setOpen(false);
              }}
              className="text-left text-sm font-medium py-1 text-white/70"
            >
              Staff / Admin Login
            </button>
            <Link href="/book" onClick={() => setOpen(false)}>
              <GoldButton className="mt-2 w-full !py-2.5">
                <Calendar size={15} /> Book Appointment
              </GoldButton>
            </Link>
          </div>
        )}
      </header>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
