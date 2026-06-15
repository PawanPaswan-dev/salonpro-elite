import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import StarRating from "@/components/ui/StarRating";
import ReviewSubmitForm from "@/components/reviews/ReviewSubmitForm";
import ReviewsList from "@/components/reviews/ReviewsList";
import { REVIEWS, AVG_RATING } from "@/data/demoData";

export const metadata = {
  title: "Reviews | SalonPro Elite",
};

export default function ReviewsPage() {
  const dist = [5, 4, 3, 2, 1].map((r) => ({
    star: r,
    count: REVIEWS.filter((rv) => rv.rating === r).length,
  }));

  return (
    <div className="bg-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Client Love"
          title="Reviews & Ratings"
          subtitle={`${REVIEWS.length}+ verified reviews from our valued members.`}
        />

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          <GlassCard className="p-8 text-center flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-gold mb-2 font-serif">{AVG_RATING}</div>
            <StarRating rating={5} size={20} />
            <div className="text-white/40 text-sm mt-2">{REVIEWS.length} total reviews</div>
          </GlassCard>
          <GlassCard className="p-6 md:col-span-2">
            {dist.map((d) => (
              <div key={d.star} className="flex items-center gap-3 mb-2.5">
                <span className="text-white/60 text-sm w-12">{d.star} star</span>
                <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold to-gold-dark"
                    style={{ width: `${(d.count / REVIEWS.length) * 100}%` }}
                  />
                </div>
                <span className="text-white/40 text-xs w-10 text-right">{d.count}</span>
              </div>
            ))}
          </GlassCard>
        </div>

        <ReviewSubmitForm />
        <ReviewsList />
      </div>
    </div>
  );
}
