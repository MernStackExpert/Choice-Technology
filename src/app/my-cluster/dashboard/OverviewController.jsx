"use client";

import React, { useContext } from "react";
import { AuthContext } from "@/Provider/AuthContext";
import UserOverview from "@/Components/Cluster_Dashboard-Layouts/Overview_Controller/UserOverview";
import AdminOverview from "@/Components/Cluster_Dashboard-Layouts/Overview_Controller/AdminOverview";

const OverviewController = () => {
  const { dbUser, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const role = dbUser?.data?.role || "user";

  return (
    <>
      {role === "admin" ? <AdminOverview/> : <UserOverview />}
    </>
  );
};

export default OverviewController;