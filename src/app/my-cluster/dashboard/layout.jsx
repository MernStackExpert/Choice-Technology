import DashNav from "@/Components/Cluster_Layouts/Navbar/DashNav";
import Sidebar from "@/Components/Cluster_Layouts/Navbar/Sidebar";
import React from "react";
export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden relative w-full">
      {/* বাম পাশের সাইডবার */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 hidden lg:block border-r border-cyan-500/10 backdrop-blur-3xl bg-black/20">
        <Sidebar />
      </aside>

      {/* ডান পাশের মূল কন্টেন্ট এরিয়া */}
      <div className="flex-1 flex flex-col lg:ml-64 w-full relative">
        {/* ড্যাশবোর্ডের নিজস্ব নেভবার */}
        <header className="sticky top-0 z-40 w-full border-b border-cyan-500/10 backdrop-blur-md bg-transparent">
          <DashNav />
        </header>

        {/* কন্টেন্ট যা এখন ফুল উইডথ পাবে */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 custom-scrollbar">
          <div className="w-full h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}