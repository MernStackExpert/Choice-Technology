import ApprovedPaymentsController from "@/Components/ADMIN/PAYMENTS/ApprovedPaymentsController";

export const metadata = {
  title: "Finalize Sync | Choice Technology",
  description: "Authorize approved funds into operational nodes",
};

export default function ConfirmPaymentsPage() {
  return (
    <div className="w-full min-h-screen pt-24 pb-20">
      <ApprovedPaymentsController />
    </div>
  );
}