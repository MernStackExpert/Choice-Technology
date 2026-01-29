"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, CreditCard, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", icon: <LayoutDashboard size={20} />, path: "/my-cluster/dashboard" },
    { name: "My Orders", icon: <ShoppingBag size={20} />, path: "/my-cluster/dashboard/my-order" },
    { name: "Payments", icon: <CreditCard size={20} />, path: "/my-cluster/dashboard/payment-history" },
    { name: "Settings", icon: <Settings size={20} />, path: "/my-cluster/dashboard/settings" },
  ];

  return (
    <div className="flex flex-col h-full p-6 text-white">
      <div className="mb-10 px-4">
        <h2 className="text-xl font-black tracking-tighter text-cyan-400">CHOICE TECH.</h2>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
              pathname === item.path 
              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.1)]" 
              : "hover:bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto border-t border-cyan-500/10 pt-6">
        <button className="flex items-center gap-4 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
          <LogOut size={20} />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;