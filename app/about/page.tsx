import Image from "next/image";
import { Crown, Heart, Zap } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { CUSTOMERS, EMPLOYEES, AVG_RATING } from "@/data/demoData";

export const metadata = {
  title: "About Us | SalonPro Elite",
};

export default function AboutPage() {
  return (
    <div className="bg-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Our Story"
          title="About SalonPro Elite"
          subtitle="Eight years of redefining luxury grooming in the heart of Kolkata."
        />
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=900&q=80"
              alt="Salon team"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4 text-white/60 leading-relaxed">
            <p>
              Founded in 2018, SalonPro Elite began with a simple vision — to
              bring world-class grooming and beauty standards to a city that
              deserved nothing less than the finest. What started as a boutique
              studio with 4 chairs has grown into a 14,000 sq. ft. flagship
              destination.
            </p>
            <p>
              Today, we operate as a full-fledged unisex luxury salon chain,
              blending artistry with technology. Every appointment, every
              product, and every interaction is engineered to deliver
              consistency, comfort, and indulgence.
            </p>
            <p>
              Our team of {EMPLOYEES.length} certified professionals — from
              senior colorists to bridal makeup artists — undergo continuous
              training with international brands to stay ahead of global
              trends.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-5 mb-24">
          {[
            { value: "2018", label: "Established" },
            { value: `${CUSTOMERS.length}+`, label: "Active Members" },
            { value: `${EMPLOYEES.length}`, label: "Expert Staff" },
            { value: AVG_RATING, label: "Average Rating" },
          ].map((s, i) => (
            <GlassCard key={i} className="p-6 text-center">
              <div className="text-3xl font-bold text-gold mb-1 font-serif">{s.value}</div>
              <div className="text-white/50 text-sm">{s.label}</div>
            </GlassCard>
          ))}
        </div>

        <SectionHeading eyebrow="Our Values" title="What Drives Us" />
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: Crown, title: "Excellence", desc: "We never settle for ordinary — every detail is curated to premium standards." },
            { icon: Heart, title: "Care", desc: "Genuine hospitality and personalized attention for every guest, every visit." },
            { icon: Zap, title: "Innovation", desc: "Constantly adopting the latest techniques, tools, and technology in beauty care." },
          ].map((v, i) => (
            <GlassCard key={i} className="p-8 text-center hover:border-gold/40 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <v.icon size={26} className="text-gold" />
              </div>
              <h3 className="text-white font-semibold mb-2 text-lg">{v.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
