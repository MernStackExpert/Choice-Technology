"use client";

import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/Provider/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();
  const isAuthPage = pathname.includes("/auth/");

  useEffect(() => {
    if (!loading && !user && !isAuthPage) {
      router.push("/my-cluster/auth/login");
    }
  }, [user, loading, router, isAuthPage]);

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505]">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
        <p className="text-blue-200/40 text-[10px] font-black uppercase tracking-[0.3em]">
          Syncing Neural Link...
        </p>
      </div>
    );
  }

  if (user) {
    return <>{children}</>;
  }

  return null;
};

export default PrivateRoute;