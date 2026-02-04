import OrderHistoryContent from "@/Components/Cluster_Dashboard-Layouts/(ORDERS)/OrderHistoryContent/OrderHistoryContent";
import React from "react";

export const metadata = {
  title: "Order History | Arshe Technology",
  description: "View your past completed and cancelled service nodes.",
  keywords: [
    "Order History",
    "Completed Projects",
    "Cancelled Nodes",
    "Arshe Technology",
  ],
};

export default function OrderHistoryPage() {
  return (
    <div className="w-full min-h-screen">
      <OrderHistoryContent />
    </div>
  );
}
