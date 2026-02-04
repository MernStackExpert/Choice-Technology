import OrderDetailsContent from "@/Components/Cluster_Dashboard-Layouts/(ORDERS)/MyOrdersContent/OrderDetailsContent";
import React from "react";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Order Analysis: ${id} | Arshe Technology`,
    description:
      "Detailed breakdown of your service node and deployment status.",
  };
}

export default async function OrderDetailsPage({ params }) {
  const { id } = await params;

  return (
    <div className="w-full min-h-screen">
      <OrderDetailsContent orderId={id} />
    </div>
  );
}
