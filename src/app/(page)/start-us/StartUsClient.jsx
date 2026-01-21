"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { 
  User, Mail, Phone, MapPin, Facebook, 
  MessageSquare, ChevronDown, Check, Zap, 
  Globe, Shield, Rocket, Link 
} from "lucide-react";
import toast from "react-hot-toast";

const plans = [
  { id: "custom", name: "Custom Web Build", price: "Custom", icon: <Rocket className="text-cyan-400" />, color: "#22d3ee" },
  { id: "subscription", name: "Managed Subscription", price: "$5/mo", icon: <Globe className="text-purple-500" />, color: "#a855f7" },
  { id: "enterprise", name: "Enterprise Partnership", price: "Equity", icon: <Shield className="text-green-400" />, color: "#4ade80" },
];

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
  const [selectedPlan, setSelectedPlan] = useState("subscription");
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Verified Customer Data:", { ...data, plan: selectedPlan });
    toast.success("Application Received! Choice Technology will verify your details.");
    reset();
  };

  return (
    <div className="max-w-5xl mx-auto px-6">
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        <div className="space-y-6">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Select Package</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative p-6 rounded-3xl border cursor-pointer transition-all duration-300 ${
                  selectedPlan === plan.id 
                  ? "bg-white/10 border-cyan-500 shadow-[0_0_30px_rgba(34,211,238,0.2)]" 
                  : "bg-white/5 border-white/10"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-2xl bg-white/5">{plan.icon}</div>
                  {selectedPlan === plan.id && <div className="bg-cyan-500 rounded-full p-1"><Check size={12} className="text-black" /></div>}
                </div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-cyan-400 font-mono text-sm">{plan.price}</p>
              </div>
            ))}
          </div>
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
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input {...register("name", { required: "Name is required" })} placeholder="MD NIROB ISLAM" className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-cyan-500/50 outline-none transition-all" />
                </div>
                {errors.name && <ErrorMsg message={errors.name.message} />}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input {...register("email", { required: "Valid email is required", pattern: /^\S+@\S+$/i })} placeholder="info@choichteck.com" className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-cyan-500/50 outline-none transition-all" />
                </div>
                {errors.email && <ErrorMsg message={errors.email.message || "Invalid email format"} />}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Contact Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input {...register("phone", { required: "Phone number is required" })} placeholder="+880 1XXX-XXXXXX" className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-cyan-500/50 outline-none transition-all" />
                </div>
                {errors.phone && <ErrorMsg message={errors.phone.message} />}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input {...register("location", { required: "Location is required" })} placeholder="Rajshahi, Bangladesh" className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-cyan-500/50 outline-none transition-all" />
                </div>
                {errors.location && <ErrorMsg message={errors.location.message} />}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Facebook Page (Optional)</label>
                <div className="relative">
                  <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input {...register("facebook")} placeholder="facebook.com/yourpage" className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-cyan-500/50 outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Current Website (If any)</label>
                <div className="relative">
                  <Link className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input {...register("website")} placeholder="https://yoursite.com" className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-cyan-500/50 outline-none transition-all" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Web Experience Level</label>
              <div className="relative">
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" size={18} />
                <select {...register("experience", { required: "Please select your experience" })} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 focus:border-cyan-500/50 outline-none appearance-none cursor-pointer transition-all">
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
                <MessageSquare className="absolute left-4 top-5 text-gray-600" size={18} />
                <textarea {...register("description", { required: "Description is required" })} rows="5" placeholder="Tell us about your project..." className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-cyan-500/50 outline-none transition-all resize-none" />
              </div>
              {errors.description && <ErrorMsg message={errors.description.message} />}
            </div>

            <button type="submit" className="w-full py-5 bg-white text-black rounded-2xl font-black text-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-3 cursor-pointer">
              Launch Project <Zap size={20} />
            </button>
          </div>
        </motion.div>
      </form>
    </div>
  );
}