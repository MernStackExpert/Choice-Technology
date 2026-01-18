"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function HeroContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
      
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
      >
        <div className="relative w-[180px] h-[60px] md:w-[240px] md:h-[80px]">
          <Image
            src="/choice-logo.png"
            alt="Choice Technology"
            fill
            className="object-contain mix-blend-lighten lg:object-left"
            priority
          />
        </div>

        <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight">
          Next Gen Tech <br />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Solutions
          </span>
        </h1>
        
        <div className="text-xl md:text-3xl text-gray-400 font-medium h-10">
          <Typewriter
            words={["Web Development", "3D Experiences", "UI/UX Design", "MERN Solutions"]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </div>

        <p className="text-gray-400 text-sm md:text-lg max-w-xl leading-relaxed">
          We specialize in crafting high-performance digital products. 
          Our team transforms complex ideas into seamless, visually stunning user experiences.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative flex justify-center items-center"
      >
        <div className="relative w-full aspect-square max-w-[500px]">
          <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full animate-pulse" />
          <Image
            src="/choice-bg-img.png" 
            alt="Hero Feature"
            fill
            className="object-contain drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]"
          />
        </div>
      </motion.div>

    </div>
  );
}