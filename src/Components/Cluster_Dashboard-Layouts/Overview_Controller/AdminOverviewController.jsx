"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Loader2 } from "lucide-react";
import AdminStatsCards from "./admin_section/AdminStatsCards";
import AdminCharts from "./admin_section/AdminCharts";
import RecentActivity from "./admin_section/RecentActivity";

export default function AdminOverviewController() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get("/admin/stats");
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (error) {
        console.error("Failed to load admin stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="h-[70vh] flex flex-col items-center justify-center gap-4 text-cyan-500 font-mono text-[10px] uppercase tracking-[0.4em]">
      <Loader2 className="animate-spin" size={32} />
      Initializing_Admin_Pulse...
    </div>
  );

  return (
    <div className="space-y-10 pb-12">
      <AdminStatsCards metrics={stats.metrics} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <AdminCharts metrics={stats.metrics} />
        
        <RecentActivity 
            latestOrders={stats.latestOrders} 
            latestPayments={stats.latestPayments} 
        />
      </div>
    </div>
  );
}