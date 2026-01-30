import PaymentDetailsController from "@/Components/ADMIN/PAYMENTS/PaymentDetailsController";

export const metadata = {
  title: "Payment Authorization | Admin Intelligence",
};

export default async function PaymentDetailsPage({ params }) {
  const { id } = await params;

  return (
    <div className="w-full min-h-screen pt-24 pb-20">
      <PaymentDetailsController id={id} />
    </div>
  );
}