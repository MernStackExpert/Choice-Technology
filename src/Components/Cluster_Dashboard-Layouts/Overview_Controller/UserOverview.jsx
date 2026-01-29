"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Provider/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import DeploymentVelocity from "./chart/DeploymentVelocity";
import FinancialNode from "./chart/FinancialNode";
import ActivityTimeline from "./chart/ActivityTimeline";
import LatestOrders from "./LatestOrders";

const UserOverview = () => {
  const { dbUser, user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRealData = async () => {
      if (!user?.uid) return;
      try {
        const [orderRes, paymentRes] = await Promise.all([
          axiosInstance.get(`/orders/user/${user.uid}`),
          axiosInstance.get(`/payment/my-history?email=${user.email}`)
        ]);
        setOrders(orderRes.data.data || []);
        setPayments(paymentRes.data.data || []);
      } catch (error) {
        console.error("Sync Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRealData();
  }, [user]);

  if (loading) return <div className="h-96 flex items-center justify-center text-cyan-500 font-mono animate-pulse">SYNCHRONIZING_DATA...</div>;

  return (
    <div className="w-full space-y-8 pb-10">
      <header>
        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
          System <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Pulse</span>
        </h1>
        <p className="text-cyan-500/50 mt-2 font-bold uppercase text-[10px] tracking-[0.3em]">
          ACTIVE_NODES: {orders.length} / SESSION: {dbUser?.name}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartWrapper title="Deployment Velocity"><DeploymentVelocity orders={orders} /></ChartWrapper>
            <ChartWrapper title="Financial Node Analysis"><FinancialNode orders={orders} /></ChartWrapper>
          </div>
          <ChartWrapper title="Node Activity Timeline"><ActivityTimeline payments={payments} /></ChartWrapper>
        </div>

        <div className="lg:col-span-1">
          <LatestOrders orders={orders} />
        </div>
      </div>
    </div>
  );
};

const ChartWrapper = ({ title, children }) => (
  <div className="bg-black/20 border border-cyan-500/10 rounded-[2.5rem] p-6 backdrop-blur-3xl">
    <h3 className="text-cyan-400 text-[10px] font-black uppercase mb-6 tracking-[0.2em] opacity-60">{title}</h3>
    <div className="h-[250px] w-full">{children}</div>
  </div>
);

export default UserOverview;