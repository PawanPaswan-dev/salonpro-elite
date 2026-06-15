import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, Crown, Award, Gem, Shield, Wallet, Quote, Calendar } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import GoldButton from "@/components/ui/GoldButton";
import SectionHeading from "@/components/ui/SectionHeading";
import { SERVICES, CUSTOMERS, EMPLOYEES, REVIEWS, AVG_RATING } from "@/data/demoData";
import { fmtINR } from "@/lib/utils";

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a1408] to-black" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-2 gap-12 items-center w-full">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              <Sparkles size={14} /> Kolkata&apos;s Premier Unisex Salon
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-6 font-serif">
              Elevate Your <span className="text-gold">Elegance</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
              Step into a world of refined grooming and beauty. From signature
              haircuts to bridal artistry, every service is crafted to make you
              feel extraordinary.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/book">
                <GoldButton>
                  Book Appointment <ArrowRight size={16} />
                </GoldButton>
              </Link>
              <Link href="/services">
                <GoldButton variant="outline">Explore Services</GoldButton>
              </Link>
            </div>
            <div className="flex gap-8">
              <div>
                <div className="text-2xl font-bold text-white">
                  {AVG_RATING}
                  <span className="text-gold">/5</span>
                </div>
                <div className="text-xs text-white/40 mt-1">Avg. Rating ({REVIEWS.length}+ Reviews)</div>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <div className="text-2xl font-bold text-white">{CUSTOMERS.length}+</div>
                <div className="text-xs text-white/40 mt-1">Happy Members</div>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <div className="text-2xl font-bold text-white">{EMPLOYEES.length}</div>
                <div className="text-xs text-white/40 mt-1">Expert Professionals</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=900&q=80"
                alt="Luxury salon interior"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <GlassCard className="absolute -bottom-6 -left-6 p-4 flex items-center gap-3 shadow-2xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <Crown size={20} className="text-black" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">Platinum Membership</div>
                <div className="text-white/50 text-xs">30% off + VIP access</div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="bg-[#0a0a0a] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="What We Offer"
            title="Signature Services"
            subtitle="Curated treatments delivered by master professionals using premium products."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.slice(0, 4).map((s) => (
              <Link key={s.id} href="/services">
                <GlassCard className="p-6 hover:border-gold/40 transition-all duration-300 hover:-translate-y-2 group cursor-pointer h-full">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    <s.icon size={22} className="text-gold" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{s.name}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gold font-bold">{fmtINR(s.price)}</span>
                    <span className="text-white/40 flex items-center gap-1">
                      <Calendar size={12} /> {s.duration} min
                    </span>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services">
              <GoldButton variant="outline">
                View All Services <ArrowRight size={16} />
              </GoldButton>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-black py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=900&q=80"
              alt="Premium hair styling"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading eyebrow="The Elite Difference" title="Crafted For The Discerning Few" />
            <div className="space-y-5">
              {[
                {
                  icon: Award,
                  title: "Master Professionals",
                  desc: "Our stylists are trained at international academies and continuously certified in the latest techniques.",
                },
                {
                  icon: Gem,
                  title: "Premium-Only Products",
                  desc: "We use exclusively luxury-grade, ammonia-free and dermatologically tested products on every client.",
                },
                {
                  icon: Shield,
                  title: "Hygiene First Protocol",
                  desc: "Sterilized tools, single-use consumables, and a meticulously maintained premium environment.",
                },
                {
                  icon: Wallet,
                  title: "Rewarding Loyalty",
                  desc: "Earn points on every visit, redeemable across services with our digital wallet & membership system.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0a0a0a] py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative">
          <Quote className="text-gold mx-auto mb-6" size={36} />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif">
            &ldquo;An experience that redefines what a salon visit can feel
            like.&rdquo;
          </h2>
          <p className="text-white/50 mb-8">
            Join {CUSTOMERS.length}+ members enjoying premium grooming, exclusive
            rewards, and white-glove service.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/book">
              <GoldButton>
                Book Your Appointment <Calendar size={16} />
              </GoldButton>
            </Link>
            <Link href="/membership">
              <GoldButton variant="outline">View Membership Plans</GoldButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
