"use client";

import React, { useContext } from "react";
import { AuthContext } from "@/Provider/AuthContext";
import { Camera, Mail, User, ShieldCheck } from "lucide-react";

export default function ProfileSettings() {
  const { dbUser } = useContext(AuthContext);

  return (
    <div className="space-y-10">
      <div className="bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[3.5rem] p-10 md:p-14 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-cyan-500/20 p-1 bg-black/40 overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.1)]">
              <img 
                src={dbUser?.photoURL || "/default-avatar.png"} 
                alt="Identity"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <label className="absolute bottom-1 right-1 p-3 bg-cyan-500 text-black rounded-full cursor-pointer hover:scale-110 transition-all shadow-lg">
               <Camera size={16} />
               <input type="file" className="hidden" />
            </label>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
             <div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Identity_Matrix</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Manage your public and private credentials</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="space-y-2">
                   <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest ml-1">Display_Name</label>
                   <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                      <input 
                        type="text" 
                        defaultValue={dbUser?.displayName}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-xs text-white outline-none focus:border-cyan-500 transition-all"
                      />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest ml-1">Secure_Email</label>
                   <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                      <input 
                        type="email" 
                        readOnly
                        value={dbUser?.email}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-xs text-gray-500 outline-none cursor-not-allowed"
                      />
                   </div>
                </div>
             </div>
             
             <button className="px-10 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase text-[10px] rounded-2xl transition-all shadow-lg shadow-cyan-500/20 mt-6">
                Update_Matrix_Data
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}