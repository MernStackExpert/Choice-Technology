"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Cog } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/my-cluster/settings/profile");
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-[60vh] flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <div className="w-20 h-20 border-2 border-cyan-500/10 rounded-3xl flex items-center justify-center bg-white/5 backdrop-blur-xl">
          <Cog className="text-cyan-500 animate-spin-slow" size={40} />
        </div>
        <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl -z-10 rounded-full animate-pulse" />
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-xl font-black text-white uppercase tracking-tighter">
          Initializing_Config_Environment
        </h3>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-2">
          <Loader2 className="animate-spin" size={12} /> Synchronizing Neural Parameters
        </p>
      </div>
    </div>
  );
}