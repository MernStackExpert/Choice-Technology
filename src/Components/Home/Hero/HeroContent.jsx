"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import ArsheBrandLogo from "@/Shared/ArsheBrandLogo";

export default function HeroContent() {
  return (
    <div className="relative flex flex-col items-center w-full min-h-[90vh] pt-10 md:pt-20 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full px-4 md:px-0">
        {/* Left Side: Branding & Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
        >
          <div className="relative">
            {/* <Image
              src="/cover-photo-removebg.png"
              alt="Arshe Technology"
              fill
              className="object-contain mix-blend-lighten lg:object-left"
              priority
            /> */}

            <ArsheBrandLogo />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Building the <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Digital Future
              </span>
            </h1>

            <div className="text-lg md:text-2xl text-gray-400 font-medium h-8 md:h-10">
              <Typewriter
                words={[
                  "MERN Stack Expert",
                  "3D Web Experiences",
                  "Scalable Solutions",
                  "Next.js Performance",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={40}
                delaySpeed={2000}
              />
            </div>

            <p className="text-gray-400 text-xs md:text-lg max-w-xl leading-relaxed font-light">
              Arshe Technology transforms complex business ideas into seamless,
              high-performance user experiences. Specializing in modern web
              architectures.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <Link href={"/start-us"}>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(34,211,238,0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                Start Project
              </motion.button>
            </Link>
            <Link href={"/#pricing"}>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.05)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 border border-white/10 text-white font-semibold rounded-xl backdrop-blur-md cursor-pointer"
              >
                Our Arsenal
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right Side: Interactive Image Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center items-center w-full"
        >
          <motion.div
            whileHover={{
              scale: 1.02,
              rotateY: 8,
              rotateX: -5,
            }}
            className="relative w-full aspect-[4/3] max-w-[320px] md:max-w-[550px] group"
          >
            <div className="absolute inset-0 bg-cyan-500/10 blur-[80px] rounded-full animate-pulse group-hover:bg-cyan-500/20 transition-colors" />

            <div className="relative w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
              <Image
                src="/arshe-bg-img.png"
                alt="Arshe Technology Web Solution"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 to-transparent" />
            </div>

            {/* Floating Info Tag */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 top-10 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hidden md:block"
            >
              <div className="text-xs text-cyan-400 font-bold tracking-widest uppercase mb-1">
                Status
              </div>
              <div className="text-white text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                Available for Projects
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Explore More - Centered at Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="flex flex-col items-center gap-4 cursor-pointer group"
      >
        <div className="relative w-24 h-24 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                />
              </defs>
              <text className="fill-white/20 text-[9px] uppercase font-bold tracking-[2.5px]">
                <textPath xlinkHref="#circlePath">
                  Explore Choice • Scroll Down • Explore Choice •
                </textPath>
              </text>
            </svg>
          </motion.div>
          <ArrowDown
            className="text-cyan-400 group-hover:translate-y-2 transition-transform duration-300"
            size={24}
          />
        </div>
      </motion.div>
    </div>
  );
}
