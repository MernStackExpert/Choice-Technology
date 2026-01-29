import React from "react";
import OverviewController from "./OverviewController";

export const metadata = {
  title: "System Pulse | Choice Technology",
  description: "Monitor your neural cluster, active nodes, and service deployments in real-time.",
  keywords: ["Choice Technology", "Neural Cluster", "MERN Stack", "Dashboard", "System Pulse"],
};

export default function DashboardPage() {
  return (
    <div className="w-full h-full min-h-screen">
      <OverviewController />
    </div>
  );
}