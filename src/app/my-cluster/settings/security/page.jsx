"use client";

import React, { useContext, useState } from "react";
import { AuthContext } from "@/Provider/AuthContext";
import { 
  ShieldCheck, Lock, Mail, Activity, 
  ChevronRight, Send, CheckCircle, AlertTriangle,
  Loader2, Smartphone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "@/config/firebase.config";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function SecuritySettings() {
  const { user, dbUser } = useContext(AuthContext);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleEmailVerification = async () => {
    if (user?.emailVerified) {
      Swal.fire({
        title: "Identity Verified",
        text: "Your neural node is already fully verified and secure.",
        icon: "success",
        background: "#0a0a0a",
        color: "#fff",
        confirmButtonColor: "#22d3ee",
      });
    } else {
      try {
        setVerifying(true);
        await sendEmailVerification(auth.currentUser);
        Swal.fire({
          title: "Verification Sent!",
          html: `
            <div style="text-align: left; font-size: 14px; line-height: 1.6;">
              <p>A verification link has been transmitted to your email.</p>
              <p style="color: #22d3ee; font-weight: bold; margin-top: 10px;">IMPORTANT:</p>
              <ul style="color: #888;">
                <li>Check your <b>Spam</b> or <b>Junk</b> folder.</li>
                <li>Check your <b>Trash</b> or <b>Archive</b> folder.</li>
                <li>Ensure your network allows encrypted neural links.</li>
              </ul>
            </div>
          `,
          icon: "info",
          background: "#0a0a0a",
          color: "#fff",
          confirmButtonColor: "#22d3ee",
        });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setVerifying(false);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[3rem] p-8 md:p-12 shadow-2xl">
        <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-10 flex items-center gap-3">
          <ShieldCheck className="text-cyan-500" /> Security_Protocols
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {/* Change Password Link */}
          <SecurityCard 
            icon={<Lock size={20} />}
            title="Update Password"
            desc="Rotate your access credentials regularly"
            onClick={() => router.push("/my-cluster/settings/security/change-password")}
          />

          {/* Email Verification Link */}
          <SecurityCard 
            icon={<Mail size={20} />}
            title="Email Verification"
            desc={user?.emailVerified ? "Node identity is verified" : "Action required: Verify node connection"}
            status={user?.emailVerified ? "Verified" : "Unverified"}
            onClick={handleEmailVerification}
            loading={verifying}
          />

          {/* Active Sessions Link */}
          <SecurityCard 
            icon={<Activity size={20} />}
            title="Active Sessions"
            desc="Monitor and manage active node connections"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      {/* Active Sessions Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0a0a0a] border border-white/10 p-10 rounded-[3rem] max-w-lg w-full shadow-2xl space-y-8"
            >
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-black uppercase tracking-widest text-white">Current_Sessions</h4>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors cursor-pointer">
                  CLOSE
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-5 p-5 bg-white/5 rounded-2xl border border-white/5">
                  <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
                    <Smartphone size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">Current Device (Active Now)</p>
                    <p className="text-[10px] text-gray-500 uppercase font-mono mt-1">
                      {navigator.userAgent.split(' ')[0]} / {user?.metadata?.lastSignInTime}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest leading-relaxed">
                Hardware encryption is active for all neural sessions. Log out of all nodes to reset biometric tokens.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const SecurityCard = ({ icon, title, desc, status, onClick, loading }) => (
  <button 
    onClick={onClick}
    disabled={loading}
    className="w-full flex items-center justify-between p-6 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.06] hover:border-cyan-500/30 transition-all group text-left cursor-pointer"
  >
    <div className="flex items-center gap-6">
      <div className="w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center text-gray-500 group-hover:text-cyan-400 transition-colors border border-white/5 shadow-inner">
        {loading ? <Loader2 className="animate-spin" /> : icon}
      </div>
      <div>
        <h4 className="text-[11px] font-black text-white uppercase tracking-widest mb-1">{title}</h4>
        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter italic">{desc}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      {status && (
        <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${status === 'Verified' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
          {status}
        </span>
      )}
      <ChevronRight size={18} className="text-gray-700 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
    </div>
  </button>
);