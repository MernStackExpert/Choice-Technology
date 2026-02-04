import PaymentArchiveController from "@/Components/ADMIN/PAYMENTS/PaymentArchiveController";

export const metadata = {
  title: "Financial Archive | Arshe Technology",
  description: "Historical record of verified and rejected transactions",
};

export default function PaymentArchivePage() {
  return (
    <div className="w-full min-h-screen pt-24 pb-20">
      <PaymentArchiveController />
    </div>
  );
}
