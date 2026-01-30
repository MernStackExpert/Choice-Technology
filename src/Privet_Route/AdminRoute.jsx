"use client";

import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/Provider/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const AdminRoute = ({ children }) => {
  const { user, loading, dbUser } = useContext(AuthContext); 
  const router = useRouter();
  const isAdmin = dbUser?.data?.role === "admin" || dbUser?.role === "admin";

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push("/my-cluster");
    }
  }, [user, isAdmin, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505]">
        <Loader2 className="animate-spin text-cyan-500 mb-4" size={48} />
        <p className="text-cyan-200/40 text-[10px] font-black uppercase tracking-[0.3em]">
          Verifying Admin Credentials <span className="loading loading-dots loading-xs"></span>
        </p>
      </div>
    );
  }

  if (user && isAdmin) {
    return <>{children}</>;
  }

  return null;
};

export default AdminRoute;