"use client";

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2, Camera, UploadCloud } from "lucide-react";
import { AuthContext } from "@/Provider/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

export default function OnboardingModal({ isOpen, setIsOpen }) {
  const { dbUser, user, setDbUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(user?.photoURL || null);
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      photoURL: user?.photoURL || ""
    }
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, formData);
      const url = res.data.data.display_url;
      setValue("photoURL", url);
      setPreview(url);
      toast.success("Profile picture updated!");
    } catch (error) {
      toast.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const submissionData = {
      ...data,
      firebaseUid: user?.uid,
      onForm: true,
    };

    try {
      const response = await axiosInstance.post("/info/userinfo", submissionData);
      
      if (response.status === 200 || response.status === 201) {
        const updateRes = await axiosInstance.patch("/auth/user/profile", { onForm: true , firebaseUid: user?.uid });
        
        if (updateRes.status === 200) {
          toast.success("Identity Verified Successfully!");
          setDbUser({ ...dbUser, onForm: true });
          setIsOpen(false);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
            onClick={() => !loading && setIsOpen(false)}
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="relative w-full max-w-3xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            <div className="flex justify-end mb-4">
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="text-center mb-10">
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Node Verification</h3>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Complete your digital identity</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col items-center mb-10">
                <div className="relative group">
                  <div className="w-28 h-28 rounded-full border-2 border-cyan-500/30 p-1 bg-white/5 backdrop-blur-md overflow-hidden">
                    {preview ? (
                      <img src={preview} alt="Profile" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-cyan-500/20">
                        <UploadCloud size={40} />
                      </div>
                    )}
                  </div>
                  <label className="absolute -bottom-2 -right-2 bg-cyan-500 p-2.5 rounded-full border-4 border-[#0a0a0a] text-black cursor-pointer hover:scale-110 transition-all shadow-lg">
                    {uploading ? <Loader2 className="animate-spin" size={16} /> : <Camera size={16} />}
                    <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                  </label>
                </div>
                <p className="text-[10px] font-black text-cyan-500/50 uppercase mt-4 tracking-widest">Update Profile Image</p>
                <input type="hidden" {...register("photoURL", { required: "Profile picture is required" })} />
                {errors.photoURL && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.photoURL.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase ml-2">Full Name (System)</label>
                  <input {...register("name")} disabled className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white/40 text-sm cursor-not-allowed" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase ml-2">Email Address (System)</label>
                  <input {...register("email")} disabled className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white/40 text-sm cursor-not-allowed" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-cyan-500 uppercase ml-2">National ID (NID)</label>
                  <input 
                    {...register("nid", { required: "NID is required", minLength: { value: 10, message: "Invalid NID format" } })}
                    placeholder="Enter NID Number"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-cyan-500 transition-all"
                  />
                  {errors.nid && <p className="text-red-500 text-[10px] font-bold ml-2">{errors.nid.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-cyan-500 uppercase ml-2">Date of Birth</label>
                  <input 
                    type="date"
                    {...register("dob", { required: "Date of Birth is required" })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-cyan-500 transition-all"
                  />
                  {errors.dob && <p className="text-red-500 text-[10px] font-bold ml-2">{errors.dob.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-cyan-500 uppercase ml-2">WhatsApp No</label>
                  <input 
                    {...register("whatsapp", { required: "WhatsApp number is required" })}
                    placeholder="+8801XXXXXXXXX"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-cyan-500 transition-all"
                  />
                  {errors.whatsapp && <p className="text-red-500 text-[10px] font-bold ml-2">{errors.whatsapp.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-cyan-500 uppercase ml-2">Contact No</label>
                  <input 
                    {...register("contact", { required: "Contact number is required" })}
                    placeholder="Primary Contact Number"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-cyan-500 transition-all"
                  />
                  {errors.contact && <p className="text-red-500 text-[10px] font-bold ml-2">{errors.contact.message}</p>}
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-cyan-500 uppercase ml-2">Father/Mother Full Name</label>
                  <input 
                    {...register("guardianName", { required: "Guardian name is required" })}
                    placeholder="Enter Legal Guardian's Name"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-cyan-500 transition-all"
                  />
                  {errors.guardianName && <p className="text-red-500 text-[10px] font-bold ml-2">{errors.guardianName.message}</p>}
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-cyan-500 uppercase ml-2">Full Residential Address</label>
                  <textarea 
                    {...register("address", { required: "Full address is required" })}
                    rows="2"
                    placeholder="Village, Road, City, Zip Code"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-cyan-500 transition-all resize-none"
                  />
                  {errors.address && <p className="text-red-500 text-[10px] font-bold ml-2">{errors.address.message}</p>}
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-cyan-500 uppercase ml-2">Short Description</label>
                  <textarea 
                    {...register("description", { required: "Description is required", minLength: { value: 20, message: "Min 20 characters required" } })}
                    rows="3"
                    placeholder="Tell us about your background"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-cyan-500 transition-all resize-none"
                  />
                  {errors.description && <p className="text-red-500 text-[10px] font-bold ml-2">{errors.description.message}</p>}
                </div>
              </div>

              <div className="pt-6">
                <button 
                  disabled={loading || uploading}
                  className="w-full py-5 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase rounded-[1.5rem] flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 shadow-[0_0_30px_rgba(34,211,238,0.2)] cursor-pointer"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <>Verify & Connect Node <CheckCircle size={20} /></>}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}