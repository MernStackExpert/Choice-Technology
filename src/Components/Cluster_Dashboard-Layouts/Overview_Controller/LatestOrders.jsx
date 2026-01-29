"use client";

import React from "react";
import { ChevronRight, Box } from "lucide-react";

const LatestOrders = ({ orders }) => {
  const latestOrders = [...orders].reverse().slice(0, 4);

  return (
    <div className="bg-black/20 border border-cyan-500/10 rounded-[2.5rem] p-6 backdrop-blur-3xl h-full">
      <h3 className="text-cyan-400 text-[10px] font-black uppercase mb-8 tracking-[0.2em] opacity-60">Latest Order History</h3>
      
      <div className="space-y-4">
        {latestOrders.length > 0 ? (
          latestOrders.map((order, idx) => (
            <div key={idx} className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 group-hover:scale-110 transition-transform">
                  <Box size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white truncate w-32 md:w-40">{order.orderTitle}</h4>
                  <p className="text-[10px] text-gray-500 font-mono mt-1 uppercase">{order.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-black text-cyan-400">${order.totalAmount}</p>
                <div className="flex items-center gap-1 text-[9px] text-gray-500 mt-1 uppercase font-bold">
                  Status <ChevronRight size={10} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-gray-600 font-mono text-[10px] uppercase tracking-widest gap-4">
            <div className="w-12 h-12 border border-dashed border-gray-700 rounded-full animate-spin"></div>
            No Orders Found
          </div>
        )}
      </div>

      {orders.length > 4 && (
        <button className="w-full mt-8 py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all">
          View All Nodes
        </button>
      )}
    </div>
  );
};

export default LatestOrders;