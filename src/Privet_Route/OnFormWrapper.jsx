"use client";

import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { AuthContext } from "@/Provider/AuthContext";
import Loading from "@/Shared/Loading";

const OnFormWrapper = ({ children }) => {
  const { user, dbUser, loading } = useContext(AuthContext);
  const router = useRouter();
  const userData = dbUser?.data || dbUser;

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/my-cluster/auth/login");
      } else if (!user.emailVerified) {
        router.push("/my-cluster/auth/verify-email");
      }
    }
  }, [user, loading, router]);

  if (loading) return <Loading />;

  if (user && user.emailVerified) {
    return <>{children}</>;
  }

  return null;
};

export default OnFormWrapper;