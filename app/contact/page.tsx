import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import ContactForm from "@/components/contact/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us | SalonPro Elite",
};

export default function ContactPage() {
  const info = [
    { icon: MapPin, title: "Visit Our Flagship", desc: "14th Floor, Elite Towers, Park Street, Kolkata, West Bengal 700016" },
    { icon: Phone, title: "Call Us", desc: "+91 98300 12345 / +91 33 4002 5566" },
    { icon: Mail, title: "Email Us", desc: "hello@salonproelite.in" },
    { icon: Clock, title: "Working Hours", desc: "Monday - Sunday: 9:00 AM - 9:00 PM" },
  ];

  return (
    <div className="bg-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Contact Us"
          subtitle="We'd love to hear from you — visit, call, or message us anytime."
        />
        <div className="grid lg:grid-cols-2 gap-10">
          <ContactForm />
          <div className="space-y-5">
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=900&q=80"
                alt="Salon location"
                fill
                className="object-cover"
              />
            </div>
            {info.map((c, i) => (
              <GlassCard key={i} className="p-5 flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <c.icon size={20} className="text-gold" />
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">{c.title}</div>
                  <div className="text-white/50 text-sm">{c.desc}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
