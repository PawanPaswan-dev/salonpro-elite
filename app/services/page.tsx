import SectionHeading from "@/components/ui/SectionHeading";
import ServicesGrid from "@/components/services/ServicesGrid";

export const metadata = {
  title: "Services | SalonPro Elite",
};

export default function ServicesPage() {
  return (
    <div className="bg-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Our Menu"
          title="Premium Services"
          subtitle="Every treatment is performed by certified specialists with premium-grade products."
        />
        <ServicesGrid />
      </div>
    </div>
  );
}
