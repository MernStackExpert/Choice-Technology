import DashNav from "@/Components/Cluster_Dashboard-Layouts/Navbar/DashNav";
import Sidebar from "@/Components/Cluster_Dashboard-Layouts/Navbar/Sidebar";
import React from "react";

export const metadata = {
  title: "Dashboard | Arshe Technology",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden relative w-full bg-transparent">
      <Sidebar />

      <div className="flex-1 flex flex-col lg:ml-64 w-full relative">
        <header className="sticky top-0 z-40 w-full border-b border-cyan-500/10 backdrop-blur-md">
          <DashNav />
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="w-full h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
