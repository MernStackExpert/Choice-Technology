import ManualPaymentContent from "@/Components/Cluster_Dashboard-Layouts/ManualPaymentContent/ManualPaymentContent";
import React from "react";

export const metadata = {
  title: "Secure Payment | Arshe Technology",
  description:
    "Complete your node deployment payment securely through manual verification.",
};

export default async function PaymentPage({ params }) {
  const { id } = await params;

  return (
    <div className="w-full min-h-screen">
      <ManualPaymentContent orderId={id} />
    </div>
  );
}
