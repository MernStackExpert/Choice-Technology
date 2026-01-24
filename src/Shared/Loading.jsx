"use client";

import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent">
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-blue-600" />
        </motion.div>
        
        <motion.div
          className="absolute w-16 h-16 border-4 border-blue-200 border-t-transparent rounded-full"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
      </div>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-lg font-medium text-gray-700 tracking-widest"
      >
        CHOICE TECHNOLOGY
      </motion.p>
    </div>
  );
};

export default Loading;