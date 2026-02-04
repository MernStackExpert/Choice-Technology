"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Facebook,
  MessageSquare,
  ChevronDown,
  Zap,
  Link,
} from "lucide-react";
import Swal from "sweetalert2";
import axiosInstance from "@/utils/axiosInstance";

const ErrorMsg = ({ message }) => (
  <motion.p
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    className="text-[10px] text-red-500 font-bold uppercase tracking-wider mt-2 ml-2"
  >
    {message}
  </motion.p>
);

export default function StartUsClient({
  defaultPlan = "subscription",
  isModal = false,
}) {
  const [selectedPlan, setSelectedPlan] = useState(defaultPlan);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    setSelectedPlan(defaultPlan);
  }, [defaultPlan]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post("/startus", {
        ...data,
        plan: selectedPlan,
        submittedAt: new Date(),
      });
      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Application Received! Arshe Technology will verify your details.",
          icon: "success",
          background: "#0a0a0a",
          color: "#fff",
          confirmButtonColor: "#22d3ee",
          customClass: {
            popup: "rounded-[2rem] border border-white/10 backdrop-blur-xl",
          },
        });
        reset();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to process onboarding.",
        icon: "error",
        background: "#0a0a0a",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full mx-auto ${isModal ? "" : "max-w-7xl px-6 py-20"}`}>
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
          Initialize <span className="text-cyan-400">Onboarding</span>
        </h1>
        <p className="text-gray-400 italic">
          Plan Selected:{" "}
          <span className="text-cyan-400 uppercase font-bold tracking-widest">
            {selectedPlan}
          </span>
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="relative group p-[1px] rounded-[3rem] overflow-hidden"
        >
          <div className="absolute inset-[-100%] animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_0deg,transparent,transparent,#22d3ee,transparent,transparent)] opacity-30" />
          <div className="relative z-10 bg-[#0a0a0a]/80 backdrop-blur-3xl p-8 md:p-12 rounded-[2.9rem] border border-white/5 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.name ? "text-red-500" : "text-gray-600"}`}
                    size={18}
                  />
                  <input
                    {...register("name", {
                      required: "Required",
                      minLength: 3,
                    })}
                    placeholder="MD NIROB ISLAM"
                    className={`w-full pl-12 pr-6 py-4 bg-white/5 border ${errors.name ? "border-red-500/50" : "border-white/10"} rounded-2xl text-white focus:border-cyan-500/50 outline-none transition-all`}
                  />
                </div>
                {errors.name && <ErrorMsg message={errors.name.message} />}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.email ? "text-red-500" : "text-gray-600"}`}
                    size={18}
                  />
                  <input
                    {...register("email", {
                      required: "Required",
                      pattern: /^\S+@\S+$/i,
                    })}
                    placeholder="info@choichteck.com"
                    className={`w-full pl-12 pr-6 py-4 bg-white/5 border ${errors.email ? "border-red-500/50" : "border-white/10"} rounded-2xl text-white focus:border-cyan-500/50 outline-none transition-all`}
                  />
                </div>
                {errors.email && <ErrorMsg message={errors.email.message} />}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Contact Number
                </label>
                <div className="relative">
                  <Phone
                    className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.phone ? "text-red-500" : "text-gray-600"}`}
                    size={18}
                  />
                  <input
                    {...register("phone", { required: "Required" })}
                    placeholder="+880 1XXX-XXXXXX"
                    className={`w-full pl-12 pr-6 py-4 bg-white/5 border ${errors.phone ? "border-red-500/50" : "border-white/10"} rounded-2xl text-white focus:border-cyan-500/50 outline-none transition-all`}
                  />
                </div>
                {errors.phone && <ErrorMsg message={errors.phone.message} />}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Location
                </label>
                <div className="relative">
                  <MapPin
                    className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.location ? "text-red-500" : "text-gray-600"}`}
                    size={18}
                  />
                  <input
                    {...register("location", { required: "Required" })}
                    placeholder="Rajshahi, Bangladesh"
                    className={`w-full pl-12 pr-6 py-4 bg-white/5 border ${errors.location ? "border-red-500/50" : "border-white/10"} rounded-2xl text-white focus:border-cyan-500/50 outline-none transition-all`}
                  />
                </div>
                {errors.location && (
                  <ErrorMsg message={errors.location.message} />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Facebook (Optional)
                </label>
                <input
                  {...register("facebook")}
                  placeholder="URL"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Website (Optional)
                </label>
                <input
                  {...register("website")}
                  placeholder="URL"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                Project Description (Min 20 characters)
              </label>
              <textarea
                {...register("description", {
                  required: "Required",
                  minLength: 20,
                })}
                rows="5"
                placeholder="..."
                className={`w-full px-6 py-4 bg-white/5 border ${errors.description ? "border-red-500/50" : "border-white/10"} rounded-2xl text-white outline-none transition-all resize-none`}
              />
              {errors.description && (
                <ErrorMsg message={errors.description.message} />
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-5 bg-white text-black rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-cyan-400"}`}
            >
              {isSubmitting ? "Processing..." : "Launch Project"}{" "}
              <Zap size={20} />
            </button>
          </div>
        </motion.div>
      </form>
    </div>
  );
}
