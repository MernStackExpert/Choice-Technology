"use client";

import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AuthContext } from "@/Provider/AuthContext";
import {
  User, Bell, Cog, ArrowLeft, Fingerprint, 
  Cpu, ShieldCheck, MailWarning, Send, 
  Loader2, CheckCircle, ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "@/config/firebase.config";
import toast from "react-hot-toast";

const settingLinks = [
  { name: "Identity_Profile", path: "/my-cluster/settings/profile", icon: <User size={18} /> },
  { name: "Security_Protocol", path: "/my-cluster/settings/security", icon: <ShieldCheck size={18} /> },
  // { name: "Neural_Alerts", path: "/my-cluster/settings/notifications", icon: <Bell size={18} /> },
];

export default function SettingsLayout({ children }) {
  const { user, loading } = useContext(AuthContext);
  const pathname = usePathname();
  const router = useRouter();
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/my-cluster/auth/login");
    }
  }, [user, loading, router]);

const handleSendVerification = async () => {
    try {
      setResending(true);
      await sendEmailVerification(auth.currentUser);
      
      toast.success(
        "Neural verification link transmitted! Please check your Inbox, Spam, or Trash folders thoroughly.", 
        {
          duration: 10000, 
          style: {
            border: '1px solid #22d3ee',
            padding: '16px',
            color: '#fff',
            background: '#0a0a0a',
          },
        }
      );
    } catch (error) {
      toast.error(`Transmission failed: ${error.message}`);
    } finally {
      setResending(false);
    }
  };

  if (loading) return (
    <div className="h-screen bg-[#050505] flex items-center justify-center">
      <Loader2 className="animate-spin text-cyan-500" size={40} />
    </div>
  );

  const isVerified = user?.emailVerified;

  return (
    <div className="min-h-screen rounded-2xl bg-[#0505058b] text-white selection:bg-cyan-500/30 relative">
      <AnimatePresence>
        {!isVerified && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] backdrop-blur-2xl bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-md w-full bg-[#0a0a0a] border border-white/10 p-10 rounded-[3rem] shadow-2xl text-center space-y-8"
            >
              <div className="relative mx-auto w-20 h-20 bg-amber-500/10 rounded-3xl flex items-center justify-center border border-amber-500/20">
                <ShieldAlert className="text-amber-500 animate-pulse" size={40} />
                <div className="absolute -inset-4 bg-amber-500/5 blur-2xl -z-10 rounded-full" />
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-black uppercase tracking-tighter">Identity_Unverified</h2>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] leading-relaxed">
                  Your neural node is restricted. Please verify your email <span className="text-white">({user?.email})</span> to access secure settings.
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <button 
                  onClick={handleSendVerification}
                  disabled={resending}
                  className="w-full py-5 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase text-[11px] rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {resending ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />} 
                  Transmit_Verification_Link
                </button>
                <button 
                  onClick={() => window.location.reload()}
                  className="w-full py-5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black uppercase text-[11px] rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <CheckCircle size={16} /> I_Have_Verified
                </button>
                <button 
                  onClick={() => router.push("/my-cluster/dashboard")}
                  className="text-[9px] font-black text-gray-600 uppercase tracking-widest hover:text-white transition-colors cursor-pointer"
                >
                  Return_To_Dashboard
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1600px] mx-auto p-4 md:p-10 relative z-10">
        <header className="flex justify-between items-center mb-16 px-4">
          <button
            onClick={() => router.push("/my-cluster/dashboard")}
            className="flex items-center gap-3 text-gray-500 hover:text-cyan-400 transition-all group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Exit_Settings</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Choice_Technology</p>
              <p className="text-[8px] font-bold text-cyan-500/50 font-mono">v2.0.26_STABLE</p>
            </div>
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
              <Cpu size={20} className="text-cyan-500" />
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-16">
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
                      isActive ? "text-cyan-400 bg-white/5 border border-white/10" : "text-gray-500 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeGlow"
                        className="absolute inset-0 bg-cyan-500/5 blur-xl -z-10"
                      />
                    )}
                    <span className={`${isActive ? "text-cyan-500 shadow-[0_0_10px_#22d3ee]" : "text-gray-600 group-hover:text-cyan-400"}`}>
                      {link.icon}
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-widest">{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-8 rounded-[2.5rem] bg-cyan-500/5 border border-cyan-500/10 hidden lg:block">
              <div className="flex items-center gap-2 text-cyan-500 mb-4">
                <Fingerprint size={16} />
                <span className="text-[9px] font-black uppercase tracking-widest">Hardware_Bound</span>
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed font-bold uppercase tracking-tighter">
                Settings are encrypted via AES-256 protocol. Your changes will synchronize across all cluster nodes instantly.
              </p>
            </div>
          </aside>

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