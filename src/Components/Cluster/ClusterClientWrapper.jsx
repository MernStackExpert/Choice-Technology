"use client";

import React, { useContext, useState } from "react";
import { AlertTriangle, ChevronRight, Lock } from "lucide-react";
import { usePathname } from "next/navigation";
import ClusterNavbar from "./ClusterNavbar";
import OnboardingModal from "./OnboardingModal";
import { AuthContext } from "@/Provider/AuthContext";

const ClusterClientWrapper = ({ children }) => {
  const context = useContext(AuthContext);
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!context) return null;

  const { dbUser, loading } = context;
  const isDashboard = pathname.includes("/dashboard");
  const userData = dbUser?.data || dbUser;
  const isOnboardingPending = userData && !userData.onForm;

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-8 h-8 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white">
      {!isDashboard && <ClusterNavbar />}

      {!isDashboard && isOnboardingPending && (
        <div className="fixed top-28 left-0 w-full z-40 px-4 md:px-8">
          <div className="max-w-7xl mx-auto group relative overflow-hidden p-[1px] rounded-2xl transition-all">
            <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent,transparent,#facc15,transparent,transparent)] opacity-40" />
            <div className="relative bg-[#0a0a0a]/90 backdrop-blur-2xl rounded-2xl px-6 py-4 flex items-center justify-between border border-white/5">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <AlertTriangle className="text-yellow-500" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-tight text-white">Action Required</h4>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Complete onboarding to unlock dashboard</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2 bg-yellow-500 text-black rounded-xl text-xs font-black uppercase transition-all hover:bg-yellow-400 cursor-pointer"
              >
                Submit Form <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      <main
        className={
          isDashboard
            ? "w-full h-full"
            : `${isOnboardingPending ? "pt-52" : "pt-32"} px-4 md:px-8 max-w-7xl mx-auto`
        }
      >
        {isDashboard && isOnboardingPending ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full" />
              <div className="relative p-8 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl">
                <Lock size={48} className="text-yellow-500 animate-pulse" />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Security Protocol Active</h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] max-w-xs mx-auto leading-relaxed">
                Identity verification required to access neural node dashboard
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-10 py-5 bg-yellow-500 text-black font-black uppercase rounded-2xl hover:bg-yellow-400 transition-all active:scale-95 shadow-[0_0_50px_rgba(250,204,21,0.15)] cursor-pointer"
            >
              Initialize Onboarding
            </button>
          </div>
        ) : (
          children
        )}
      </main>

      <OnboardingModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default ClusterClientWrapper;