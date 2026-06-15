import AppointmentTable from "@/components/reception/AppointmentTable";

export const metadata = {
  title: "Appointments | SalonPro Elite Reception",
};

export default function ReceptionAppointmentsPage() {
  return (
    <div className="space-y-6">
      <AppointmentTable />
    </div>
  );
}
