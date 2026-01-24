"use client";

import React, { useContext, useState } from "react";
import { AlertTriangle, ChevronRight } from "lucide-react";
import ClusterNavbar from "./ClusterNavbar";
import OnboardingModal from "./OnboardingModal";
import { AuthContext } from "@/Provider/AuthContext";

const ClusterClientWrapper = ({ children }) => {
  const context = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!context) return null;

  const { dbUser} = context;

  return (
    <div className="relative min-h-screen text-white">
      <ClusterNavbar />

      {dbUser && !dbUser.onForm && (
        <div className="fixed top-28 left-0 w-full z-40 px-4 md:px-8">
          <div className="max-w-7xl mx-auto group relative overflow-hidden p-[1px] rounded-2xl transition-all">
            <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent,transparent,#facc15,transparent,transparent)] opacity-40" />
            <div className="relative bg-[#0a0a0a]/90 backdrop-blur-2xl rounded-2xl px-6 py-4 flex items-center justify-between border border-white/5">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <AlertTriangle className="text-yellow-500" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-tight text-white">
                    Action Required
                  </h4>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    Complete onboarding to unlock dashboard
                  </p>
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
        className={`${dbUser && !dbUser.onForm ? "pt-52" : "pt-32"} px-4 md:px-8 max-w-7xl mx-auto`}
      >
        {children}
      </main>

      <OnboardingModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default ClusterClientWrapper;
