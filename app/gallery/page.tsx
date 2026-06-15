import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { GALLERY_IMAGES } from "@/data/demoData";

export const metadata = {
  title: "Gallery | SalonPro Elite",
};

export default function GalleryPage() {
  return (
    <div className="bg-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Inside SalonPro Elite"
          title="Gallery"
          subtitle="A glimpse into our world of luxury interiors, styling artistry and signature transformations."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((src, i) => (
            <div
              key={i}
              className={`relative rounded-2xl overflow-hidden border border-white/10 group cursor-pointer aspect-square ${
                i % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <Image
                src={src}
                alt={`Gallery ${i + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
