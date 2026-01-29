import RunningOrdersContent from "@/Components/Cluster_Dashboard-Layouts/(ORDERS)/RunningOrdersContent/RunningOrdersContent";
import React from "react";

export const metadata = {
  title: "Active Nodes | Choice Technology",
  description: "Monitor and manage your currently operational service nodes and deployments.",
  keywords: ["Active Orders", "Running Nodes", "Choice Technology System Pulse"],
};

export default function RunningOrdersPage() {
  return (
    <div className="w-full min-h-screen">
      <RunningOrdersContent />
    </div>
  );
}