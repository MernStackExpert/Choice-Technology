import UrgentPaymentContent from "@/Components/Cluster_Dashboard-Layouts/UrgentPaymentContent/UrgentPaymentContent";
import React from "react";

export const metadata = {
  title: "Critical Node Renewals | Choice Technology",
  description: "Identify and renew service nodes expiring within the next 24 hours to avoid system downtime.",
};

export default function UrgentPaymentPage() {
  return (
    <div className="w-full min-h-screen">
      <UrgentPaymentContent />
    </div>
  );
}