"use client";

import React, { useContext, useState } from "react";
import { AuthContext } from "@/Provider/AuthContext";
import { Camera, Mail, User, ShieldCheck, Loader2, Save } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";

export default function ProfileSettings() {
  const { user, dbUser, setDbUser, updateUserProfile } = useContext(AuthContext);
  const [updating, setUpdating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newName, setNewName] = useState(dbUser?.data?.name || user?.displayName || "");
  const [preview, setPreview] = useState(dbUser?.data?.photoURL || user?.photoURL || "");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        formData
      );
      const url = res.data.data.display_url;
      setPreview(url);
      toast.success("Image staged for synchronization");
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSyncProfile = async () => {
    if (!newName.trim()) return toast.error("Name cannot be empty");

    const result = await Swal.fire({
      title: "Confirm Update?",
      text: "Do you want to synchronize these changes with your neural identity?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22d3ee",
      cancelButtonColor: "#f43f5e",
      confirmButtonText: "YES, UPDATE",
      background: "#0a0a0a",
      color: "#fff",
    });

    if (result.isConfirmed) {
      setUpdating(true);
      try {
        await updateUserProfile({
          displayName: newName,
          photoURL: preview,
        });

        const res = await axiosInstance.patch("auth/user/profile", {
          firebaseUid: user?.uid, // এখানে UID পাঠানো নিশ্চিত করা হয়েছে
          name: newName,
          photoURL: preview,
        });

        if (res.data) {
          setDbUser((prev) => ({
            ...prev,
            data: { ...prev.data, name: newName, photoURL: preview },
          }));
          
          Swal.fire({
            title: "Synchronized!",
            text: "Your profile is now up to date.",
            icon: "success",
            background: "#0a0a0a",
            color: "#fff",
            confirmButtonColor: "#22d3ee",
          });
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Sync failed");
      } finally {
        setUpdating(false);
      }
    }
  };

  return (
    <div className="space-y-10">
      <div className="bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[3.5rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] -z-10" />
        
        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-cyan-500/20 p-1 bg-black/40 overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.2)]">
              {uploading ? (
                <div className="w-full h-full flex items-center justify-center bg-black/60">
                  <Loader2 className="animate-spin text-cyan-500" />
                </div>
              ) : (
                <img 
                  src={preview || "/default-avatar.png"} 
                  alt="Identity"
                  className="w-full h-full object-cover rounded-full"
                />
              )}
            </div>
            <label className="absolute bottom-1 right-1 p-3 bg-cyan-500 text-black rounded-full cursor-pointer hover:scale-110 transition-all shadow-lg active:scale-95">
               <Camera size={16} />
               <input type="file" className="hidden" onChange={handleImageUpload} disabled={uploading} />
            </label>
          </div>

          <div className="flex-1 text-center md:text-left space-y-6">
             <div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Identity_Matrix</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Authorized Credential Management</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest ml-1">Editable_Display_Name</label>
                   <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                      <input 
                        type="text" 
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-xs text-white outline-none focus:border-cyan-500 transition-all focus:bg-white/[0.08]"
                        placeholder="Enter neural name"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest ml-1">Locked_Secure_Email</label>
                   <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 opacity-30" size={16} />
                      <input 
                        type="email" 
                        readOnly
                        value={dbUser?.data?.email || user?.email || ""}
                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-xs text-gray-600 outline-none cursor-not-allowed font-mono italic"
                      />
                   </div>
                </div>
             </div>

             <div className="pt-6 flex flex-col sm:flex-row items-center gap-6">
                <button 
                  onClick={handleSyncProfile}
                  disabled={updating || uploading}
                  className="w-full sm:w-auto px-10 py-4 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black uppercase text-[10px] rounded-2xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                >
                  {updating ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />} 
                  Commit_Changes
                </button>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                    Role: {dbUser?.data?.role || "Synchronizing..."}
                  </span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}