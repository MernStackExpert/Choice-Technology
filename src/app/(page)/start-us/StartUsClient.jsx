"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  User, Mail, Phone, MapPin, Facebook, 
  MessageSquare, ChevronDown, Zap, Link 
} from "lucide-react";
import Swal from "sweetalert2";
import axiosInstance from "@/utils/axiosInstance";
import PricingContent from "@/Components/Home/Pricing/PricingContent";

const ErrorMsg = ({ message }) => (
  <motion.p 
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    className="text-[10px] text-red-500 font-bold uppercase tracking-wider mt-2 ml-2"
  >
    {message}
  </motion.p>
);

export default function StartUsClient() {
  const searchParams = useSearchParams();
  const planFromUrl = searchParams.get("plan");
  
  const [selectedPlan, setSelectedPlan] = useState("subscription");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: "onBlur"
  });

  useEffect(() => {
    if (planFromUrl) {
      setSelectedPlan(planFromUrl);
    }
  }, [planFromUrl]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const payload = { 
      ...data, 
      plan: selectedPlan,
      submittedAt: new Date() 
    };

    try {
      const response = await axiosInstance.post("/startus", payload);
      
      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Application Received! Choice Technology will verify your details.",
          icon: "success",
          background: "#0a0a0a",
          color: "#fff",
          confirmButtonColor: "#22d3ee",
          customClass: {
            popup: "rounded-[2rem] border border-white/10 backdrop-blur-xl"
          }
        });
        reset();
      }
    } catch (error) {
      console.error("Submission Error:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to process onboarding. Please try again.",
        icon: "error",
        background: "#0a0a0a",
        color: "#fff",
        confirmButtonColor: "#ef4444"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <header className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-white mb-4"
        >
          Initialize <span className="text-cyan-400">Onboarding</span>
        </motion.h1>
        <p className="text-gray-400 italic">Complete the verified form to join Choice Technology.</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
        <div className="space-y-8">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
            Select Your Business Model
          </label>
          <PricingContent 
            selectedPlan={selectedPlan} 
            onSelect={setSelectedPlan}
            isOnboarding={true}
          />
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="relative group p-[1px] rounded-[3rem] overflow-hidden"
        >
          <div className="absolute inset-[-100%] animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_0deg,transparent,transparent,#22d3ee,transparent,transparent)] opacity-30" />
          
          <div className="relative z-10 bg-[#0a0a0a]/40 backdrop-blur-3xl p-8 md:p-12 rounded-[2.9rem] border border-white/5 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.name ? 'text-red-500' : 'text-gray-600'}`} size={18} />
                  <input 
                    {...register("name", { 
                        required: "Full name is required",
                        minLength: { value: 3, message: "Name must be at least 3 characters" }
                    })} 
                    placeholder="MD NIROB ISLAM" 
                    className={`w-full pl-12 pr-6 py-4 bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-2xl text-white focus:border-cyan-500/50 outline-none transition-all`} 
                  />
                </div>
                {errors.name && <ErrorMsg message={errors.name.message} />}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-500' : 'text-gray-600'}`} size={18} />
                  <input 
                    {...register("email", { 
                      required: "Email is required", 
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Please enter a valid email address"
                      }
                    })} 
                    placeholder="info@choichteck.com" 
                    className={`w-full pl-12 pr-6 py-4 bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-2xl text-white focus:border-cyan-500/50 outline-none transition-all`} 
                  />
                </div>
                {errors.email && <ErrorMsg message={errors.email.message} />}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Contact Number</label>
                <div className="relative">
                  <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.phone ? 'text-red-500' : 'text-gray-600'}`} size={18} />
                  <input 
                    {...register("phone", { 
                        required: "Phone number is required",
                        pattern: {
                            value: /^[0-9+-\s]+$/,
                            message: "Invalid phone number format"
                        }
                    })} 
                    placeholder="+880 1XXX-XXXXXX" 
                    className={`w-full pl-12 pr-6 py-4 bg-white/5 border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} rounded-2xl text-white focus:border-cyan-500/50 outline-none transition-all`} 
                  />
                </div>
                {errors.phone && <ErrorMsg message={errors.phone.message} />}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Location</label>
                <div className="relative">
                  <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.location ? 'text-red-500' : 'text-gray-600'}`} size={18} />
                  <input 
                    {...register("location", { required: "Location is required" })} 
                    placeholder="Rajshahi, Bangladesh" 
                    className={`w-full pl-12 pr-6 py-4 bg-white/5 border ${errors.location ? 'border-red-500/50' : 'border-white/10'} rounded-2xl text-white focus:border-cyan-500/50 outline-none transition-all`} 
                  />
                </div>
                {errors.location && <ErrorMsg message={errors.location.message} />}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Facebook Page (Optional)</label>
                <div className="relative">
                  <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input 
                    {...register("facebook")} 
                    placeholder="facebook.com/yourpage" 
                    className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-cyan-500/50 outline-none transition-all" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Current Website (If any)</label>
                <div className="relative">
                  <Link className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input 
                    {...register("website")} 
                    placeholder="https://yoursite.com" 
                    className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-cyan-500/50 outline-none transition-all" 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Web Experience Level</label>
              <div className="relative">
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" size={18} />
                <select 
                  {...register("experience", { required: "Please select your experience level" })} 
                  className={`w-full px-6 py-4 bg-white/5 border ${errors.experience ? 'border-red-500/50' : 'border-white/10'} rounded-2xl text-gray-400 focus:border-cyan-500/50 outline-none appearance-none cursor-pointer transition-all`}
                >
                  <option value="" className="bg-[#0a0a0a]">Select Experience</option>
                  <option value="first-time" className="bg-[#0a0a0a]">I am First Time</option>
                  <option value="experienced" className="bg-[#0a0a0a]">I Have Experience</option>
                  <option value="expert" className="bg-[#0a0a0a]">I am Expert</option>
                  <option value="other" className="bg-[#0a0a0a]">Other</option>
                  <option value="none" className="bg-[#0a0a0a]">Don't Say</option>
                </select>
              </div>
              {errors.experience && <ErrorMsg message={errors.experience.message} />}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Project Description</label>
              <div className="relative">
                <MessageSquare className={`absolute left-4 top-5 transition-colors ${errors.description ? 'text-red-500' : 'text-gray-600'}`} size={18} />
                <textarea 
                  {...register("description", { 
                      required: "Project description is required",
                      minLength: { value: 20, message: "Description must be at least 20 characters long" }
                  })} 
                  rows="5" 
                  placeholder="Tell us about your project..." 
                  className={`w-full pl-12 pr-6 py-4 bg-white/5 border ${errors.description ? 'border-red-500/50' : 'border-white/10'} rounded-2xl text-white focus:border-cyan-500/50 outline-none transition-all resize-none`} 
                />
              </div>
              {errors.description && <ErrorMsg message={errors.description.message} />}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full py-5 bg-white text-black rounded-2xl font-black text-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-3 cursor-pointer ${isSubmitting ? 'opacity-50 cursor-not-allowed shadow-none' : 'shadow-xl shadow-white/10'}`}
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>Launch Project <Zap size={20} /></>
              )}
            </button>
          </div>
        </motion.div>
      </form>
    </div>
  );
}