"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  User,
  Bell,
  Cog,
  ArrowLeft,
  Fingerprint,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

const settingLinks = [
  {
    name: "Identity_Profile",
    path: "/my-cluster/settings/profile",
    icon: <User size={18} />,
  },
  {
    name: "Security_Protocol",
    path: "/my-cluster/settings/security",
    icon: <ShieldCheck size={18} />,
  },
  {
    name: "Neural_Alerts",
    path: "/my-cluster/settings/notifications",
    icon: <Bell size={18} />,
  },
];

export default function SettingsLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30">
      <div className="max-w-[1600px] mx-auto p-4 md:p-10 relative z-10">
        {/* Top Header Navbar */}
        <header className="flex justify-between items-center mb-16 px-4">
          <button
            onClick={() => router.push("/my-cluster/dashboard")}
            className="flex items-center gap-3 text-gray-500 hover:text-cyan-400 transition-all group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Exit_Settings
            </span>
          </button>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                Choice_Technology
              </p>
              <p className="text-[8px] font-bold text-cyan-500/50 font-mono">
                v2.0.26_STABLE
              </p>
            </div>
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
              <Cpu size={20} className="text-cyan-500" />
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Settings Sidebar Navbar */}
          <aside className="lg:w-80 shrink-0 space-y-12">
            <div>
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                <Cog className="text-cyan-500" /> Settings
              </h2>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-2 italic">
                System configuration & preference management
              </p>
            </div>

            <nav className="flex flex-col gap-3">
              {settingLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`relative flex items-center gap-5 px-8 py-5 rounded-[2rem] transition-all group overflow-hidden ${
                      isActive
                        ? "text-cyan-400 bg-white/5 border border-white/10"
                        : "text-gray-500 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeGlow"
                        className="absolute inset-0 bg-cyan-500/5 blur-xl -z-10"
                      />
                    )}
                    <span
                      className={`${isActive ? "text-cyan-500 shadow-[0_0_10px_#22d3ee]" : "text-gray-600 group-hover:text-cyan-400"}`}
                    >
                      {link.icon}
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-widest">
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-8 rounded-[2.5rem] bg-cyan-500/5 border border-cyan-500/10 hidden lg:block">
              <div className="flex items-center gap-2 text-cyan-500 mb-4">
                <Fingerprint size={16} />
                <span className="text-[9px] font-black uppercase tracking-widest">
                  Hardware_Bound
                </span>
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed font-bold uppercase tracking-tighter">
                Settings are encrypted via AES-256 protocol. Your changes will
                synchronize across all cluster nodes instantly.
              </p>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-h-[600px]">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
