import TerminatedPaymentsController from "@/Components/ADMIN/PAYMENTS/TerminatedPaymentsController";

export const metadata = {
  title: "Terminated Records | Choice Technology",
};

export default function TerminatedPaymentsPage() {
  return (
    <div className="w-full min-h-screen pt-24 pb-20 overflow-hidden">
      <TerminatedPaymentsController />
    </div>
  );
}