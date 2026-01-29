import MyOrdersContent from "@/Components/Cluster_Dashboard-Layouts/(ORDERS)/MyOrdersContent/MyOrdersContent";
import React from "react";

export const metadata = {
  title: "Pending Nodes | Choice Technology",
  description:
    "Manage and monitor your pending service deployments and active nodes.",
  keywords: ["My Orders", "Pending Projects", "Choice Technology Dashboard"],
};

export default function MyOrdersPage() {
  return (
    <div className="w-full min-h-screen">
      <MyOrdersContent />
    </div>
  );
}
