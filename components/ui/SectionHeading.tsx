interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      {eyebrow && (
        <div className="inline-flex items-center gap-2 text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          <span className="h-px w-6 bg-gold" />
          {eyebrow}
          <span className="h-px w-6 bg-gold" />
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white font-serif">
        {title}
      </h2>
      {subtitle && <p className="text-white/60 text-sm md:text-base">{subtitle}</p>}
    </div>
  );
}
