import CustomerSearch from "@/components/reception/CustomerSearch";

export const metadata = {
  title: "Customer Search | SalonPro Elite Reception",
};

export default function ReceptionCustomersPage() {
  return (
    <div className="space-y-6">
      <CustomerSearch />
    </div>
  );
}
