import ManagePaymentRequests from "@/Components/ADMIN/PAYMENTS/ManagePaymentRequests";

export const metadata = {
  title: "Financial Stream | Admin Dashboard",
  description: "Review and authorize pending payment nodes",
};

export default function AdminPaymentsPage() {
  return (
    <div className="w-full min-h-screen pt-24 pb-20 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4">
        <ManagePaymentRequests />
      </div>
    </div>
  );
}