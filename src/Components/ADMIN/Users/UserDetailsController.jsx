"use client";

import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { 
  Loader2, ArrowLeft, Mail, Phone, MapPin, 
  Calendar, Fingerprint, ShieldAlert, UserCheck, 
  Info, Globe, Heart, ShieldCheck
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UserDetailsController({ uid }) {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUserDetails = useCallback(async (uid) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/info/userinfo/${uid}`);
      setUserInfo(res.data);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error(error.response?.data?.message || "Failed to load node intelligence");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (uid) {
      fetchUserDetails(uid);
    }
  }, [uid, fetchUserDetails]);

  if (loading) return (
    <div className="h-[70vh] flex flex-col items-center justify-center gap-4 text-cyan-500 font-mono text-[10px] uppercase tracking-[0.4em]">
      <Loader2 className="animate-spin" size={32} />
      Accessing_User_Node_Data...
    </div>
  );

  if (!userInfo) return (
    <div className="h-[60vh] flex flex-col items-center justify-center text-gray-500 uppercase text-[10px] font-black tracking-widest gap-4 px-4 text-center">
      <Info size={40} className="mb-4 opacity-20" />
      Identity_Not_Found_In_Cluster
      <p className="text-[8px] text-gray-600 max-w-xs leading-relaxed uppercase tracking-widest">
        Node UID: {uid} could not be located in the current intelligence stream.
      </p>
      <button 
        onClick={() => router.back()}
        className="mt-6 px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-cyan-500 hover:bg-cyan-500/10 transition-all cursor-pointer font-black text-[9px] tracking-widest uppercase"
      >
        Return_to_Node_List
      </button>
    </div>
  );

  return (
    <div className="p-4 md:p-10 space-y-10 max-w-7xl mx-auto">
      <button 
        onClick={() => router.back()}
        className="group flex items-center gap-2 text-[10px] font-black text-gray-500 hover:text-cyan-400 uppercase tracking-widest transition-all cursor-pointer"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
        Return_to_Node_List
      </button>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-4 space-y-8">
          <div className="p-10 rounded-[3.5rem] border border-white/5 bg-white/5 backdrop-blur-3xl text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full scale-150 animate-pulse" />
              <img 
                src={userInfo.photoURL} 
                alt={userInfo.name} 
                className="relative w-40 h-40 rounded-[3rem] object-cover border-2 border-white/10 p-1 bg-[#0a0a0a]"
              />
              <div className={`absolute -bottom-3 -right-3 p-3 rounded-2xl border-4 border-[#0a0a0a] shadow-2xl ${userInfo.status === 'pending' ? 'bg-amber-500 shadow-[0_0_20px_#f59e0b]' : 'bg-emerald-500 shadow-[0_0_20px_#10b981]'}`}>
                {userInfo.status === 'pending' ? <ShieldAlert size={20} className="text-black" /> : <ShieldCheck size={20} className="text-black" />}
              </div>
            </div>

            <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">{userInfo.name}</h3>
            <p className="text-[9px] font-black text-cyan-500/60 uppercase tracking-[0.4em] mt-4 flex items-center justify-center gap-2">
              <Globe size={10} /> Status: {userInfo.status}
            </p>
          </div>

          <div className="p-8 rounded-[3rem] border border-white/5 bg-white/5 backdrop-blur-3xl space-y-6">
            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
              <Fingerprint size={14} /> System_Signature
            </h4>
            <div className="space-y-5">
              <div>
                <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest block mb-1">Database ID</span>
                <span className="text-[11px] font-mono text-white/80 break-all">{userInfo._id}</span>
              </div>
              <div>
                <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest block mb-1">Firebase UID</span>
                <span className="text-[11px] font-mono text-white/80 break-all">{userInfo.firebaseUid}</span>
              </div>
              <div>
                <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest block mb-1">Onboarding Status</span>
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${userInfo.onForm ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                  {userInfo.onForm ? "Completed" : "Incomplete"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-8 space-y-10">
          <div className="p-10 rounded-[3.5rem] border border-white/5 bg-white/5 backdrop-blur-3xl relative overflow-hidden">
            <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em] mb-12 flex items-center gap-3">
              <UserCheck size={16} /> Core_Identity_Protocol
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-10">
              <div className="flex items-start gap-5 group">
                <div className="p-4 bg-white/5 rounded-2xl text-gray-500 group-hover:text-cyan-400 group-hover:bg-cyan-500/5 transition-all"><Mail size={20} /></div>
                <div>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Access Email</p>
                  <p className="text-sm font-bold text-white mt-1 break-all">{userInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="p-4 bg-white/5 rounded-2xl text-gray-500 group-hover:text-cyan-400 group-hover:bg-cyan-500/5 transition-all"><Fingerprint size={20} /></div>
                <div>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">National ID (NID)</p>
                  <p className="text-sm font-bold text-white mt-1 tracking-widest">{userInfo.nid}</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="p-4 bg-white/5 rounded-2xl text-gray-500 group-hover:text-cyan-400 group-hover:bg-cyan-500/5 transition-all"><Phone size={20} /></div>
                <div>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Primary Contact</p>
                  <p className="text-sm font-bold text-white mt-1">{userInfo.contact}</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="p-4 bg-white/5 rounded-2xl text-gray-500 group-hover:text-cyan-400 group-hover:bg-cyan-500/5 transition-all"><Globe size={20} /></div>
                <div>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">WhatsApp ID</p>
                  <p className="text-sm font-bold text-white mt-1">{userInfo.whatsapp}</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="p-4 bg-white/5 rounded-2xl text-gray-500 group-hover:text-cyan-400 group-hover:bg-cyan-500/5 transition-all"><Calendar size={20} /></div>
                <div>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Birth Log</p>
                  <p className="text-sm font-bold text-white mt-1">{userInfo.dob}</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="p-4 bg-white/5 rounded-2xl text-gray-500 group-hover:text-cyan-400 group-hover:bg-cyan-500/5 transition-all"><Heart size={20} /></div>
                <div>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Legal Guardian</p>
                  <p className="text-sm font-bold text-white mt-1 uppercase">{userInfo.guardianName}</p>
                </div>
              </div>

              <div className="md:col-span-2 flex items-start gap-5 group pt-4">
                <div className="p-4 bg-white/5 rounded-2xl text-gray-500 group-hover:text-cyan-400 group-hover:bg-cyan-500/5 transition-all"><MapPin size={20} /></div>
                <div>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Physical Coordinates (Address)</p>
                  <p className="text-sm font-bold text-white mt-1 leading-relaxed">{userInfo.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-10 rounded-[3.5rem] border border-white/5 bg-white/5 backdrop-blur-3xl relative">
            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
              <Info size={14} /> Personal_Log_Description
            </h4>
            <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5">
              <p className="text-sm text-gray-400 leading-relaxed font-medium italic">"{userInfo.description}"</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 py-5 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase rounded-2xl transition-all active:scale-95 shadow-[0_0_30px_rgba(34,211,238,0.2)] text-[11px] tracking-widest cursor-pointer">
              Authorize_Identity
            </button>
            <button className="flex-1 py-5 bg-white/5 hover:bg-rose-500/10 border border-white/5 hover:border-rose-500/50 text-gray-500 hover:text-rose-500 font-black uppercase rounded-2xl transition-all text-[11px] tracking-widest cursor-pointer">
              Flag_Security_Risk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}