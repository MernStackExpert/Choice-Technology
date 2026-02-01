"use client";

import { AuthContext } from "@/Provider/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Loader2 } from "lucide-react";

const OrderContent = () => {
  const { user } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      planType: "monthly",
      category: "portfolio"
    }
  });

  const [maxDuration, setMaxDuration] = useState(8);
  const totalAmount = watch("totalAmount");

  useEffect(() => {
    const amount = parseFloat(totalAmount) || 0;
    if (amount >= 50000) {
      setMaxDuration(18);
    } else if (amount >= 20000) {
      setMaxDuration(14);
    } else {
      setMaxDuration(8);
    }
  }, [totalAmount]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const orderData = {
      userId: user?.uid,
      userEmail: user?.email,
      orderTitle: data.orderTitle,
      category: data.category,
      planType: data.planType,
      duration: parseInt(data.duration),
      totalAmount: parseFloat(data.totalAmount),
      description: data.description,
      requirementFile: data.requirementFile || null,
    };

    try {
      const res = await axiosInstance.post("/orders/create", orderData);
      if (res.data.success) {
        Swal.fire({
          title: "NODE INITIALIZED",
          text: `ID: ${res.data.orderId}. System check email.`,
          icon: "success",
          background: "rgba(0, 0, 0, 0.8)",
          color: "#22d3ee",
          confirmButtonColor: "#22d3ee",
          customClass: {
            popup: 'border border-cyan-500/50 backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.2)]'
          }
        });
        reset();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Critical System Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto border border-cyan-500/10 backdrop-blur-md p-10 rounded-3xl shadow-[0_0_50px_rgba(34,211,238,0.02)] my-12 relative overflow-hidden z-10">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/50 ml-1">Node Title</label>
            <input
              {...register("orderTitle", { required: "Title required" })}
              placeholder="SYSTEM_PULSE_ALPHA"
              className={`w-full bg-white/5 border ${errors.orderTitle ? 'border-red-500/50' : 'border-cyan-500/20'} p-4 rounded-xl focus:outline-none focus:border-cyan-400/60 focus:bg-white/10 transition-all text-white placeholder:text-cyan-900/50`}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/50 ml-1">Service Category</label>
            <select
              {...register("category", { required: true })}
              className="w-full bg-white/5 border border-cyan-500/20 p-4 rounded-xl focus:outline-none focus:border-cyan-400/60 text-cyan-100"
            >
              <option className="bg-[#050505]" value="portfolio">Portfolio Hub</option>
              <option className="bg-[#050505]" value="e-commerce">E-Commerce Grid</option>
              <option className="bg-[#050505]" value="personal">Personal Archive</option>
              <option className="bg-[#050505]" value="management">Management Matrix</option>
              <option className="bg-[#050505]" value="saas">SaaS Interface</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/50 ml-1">Protocol Type</label>
            <select
              {...register("planType", { required: true })}
              className="w-full bg-white/5 border border-cyan-500/20 p-4 rounded-xl focus:outline-none focus:border-cyan-400/60 text-cyan-100"
            >
              <option className="bg-[#050505]" value="monthly">Monthly Cycle</option>
              <option className="bg-[#050505]" value="days">Fixed Sequence</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/50 ml-1">Investment ($)</label>
            <input
              type="number"
              {...register("totalAmount", { required: "Value required", min: 10 })}
              className="w-full bg-white/5 border border-cyan-500/20 p-4 rounded-xl focus:outline-none focus:border-cyan-400/60 font-mono text-cyan-400"
            />
          </div>

          <div className="space-y-2 relative">
            <label className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/50 ml-1 text-nowrap">
                Duration (Max: {maxDuration})
            </label>
            <input
              type="number"
              {...register("duration", { 
                required: true, 
                validate: v => parseInt(v) <= maxDuration || `Limit: ${maxDuration}`
              })}
              className={`w-full bg-white/5 border ${errors.duration ? 'border-red-500/50' : 'border-cyan-500/20'} p-4 rounded-xl focus:outline-none focus:border-cyan-400/60 text-white`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/50 ml-1">Core Requirements</label>
          <textarea
            {...register("description", { required: "Details required" })}
            rows="4"
            className="w-full bg-white/5 border border-cyan-500/20 p-4 rounded-xl focus:outline-none focus:border-cyan-400/60 text-white placeholder:text-cyan-900/50"
            placeholder="DEFINE_SYSTEM_PARAMETERS..."
          ></textarea>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/50 ml-1">Manifesto Link / URL</label>
          <input
            {...register("requirementFile")}
            placeholder="https://cloud-storage.link/spec"
            className="w-full bg-white/5 border border-cyan-500/20 p-4 rounded-xl focus:outline-none focus:border-cyan-400/60 text-white font-mono text-xs"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-5 bg-transparent border border-cyan-500/40 text-cyan-400 font-bold rounded-xl hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-500 uppercase tracking-[0.4em] text-xs relative group overflow-hidden cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 group-hover:text-black transition-colors duration-300 flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing Node...
              </>
            ) : (
              "Initialize Deployment"
            )}
          </span>
          {!isSubmitting && (
            <div className="absolute inset-0 bg-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
          )}
        </button>
      </form>
    </section>
  );
};

export default OrderContent;