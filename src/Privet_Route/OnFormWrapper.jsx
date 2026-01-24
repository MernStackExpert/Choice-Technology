"use client";

import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import MyClusterLanding from "@/app/my-cluster/page";
import { AuthContext } from "@/Provider/AuthContext";
import Loading from "@/Shared/Loading";
const OnFormWrapper = () => {
  const { user, dbUser, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (!user.emailVerified) {
        router.push("/verify-email");
      } else if (dbUser && !dbUser.onForm) {
        router.push("/complete-profile");
      }
    }
  }, [user, dbUser, loading, router]);

  if (loading) return <Loading />;

  if (user && user.emailVerified && dbUser?.onForm) {
    return <MyClusterLanding />;
  }

  return null;
};

export default OnFormWrapper;