import SectionHeading from "@/components/ui/SectionHeading";
import BookingFlow from "@/components/booking/BookingFlow";

export const metadata = {
  title: "Book Appointment | SalonPro Elite",
};

export default function BookAppointmentPage() {
  return (
    <div className="bg-black pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          eyebrow="Reserve Your Slot"
          title="Book An Appointment"
          subtitle="Three simple steps to your next premium experience."
        />
        <BookingFlow />
      </div>
    </div>
  );
}
