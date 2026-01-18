"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Facebook, Linkedin, Twitter, Github, Mail, ChevronRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative z-10 w-full border-t border-white/5 backdrop-blur-[5px]">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 text-white"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="relative h-15">
              <Image 
                src="/choice-logo.png" 
                alt="Choice Technology" 
                fill
                className="object-contain object-left "
                priority
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Elevating digital experiences through cutting-edge technology and immersive 3D web solutions.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {["Web Development", "UI/UX Design", "3D Modeling", "IT Consulting"].map((item) => (
                <li key={item} className="group flex items-center text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer text-sm">
                  <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-6 group-hover:ml-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {["About Us", "Our Projects", "Career", "Contact"].map((item) => (
                <li key={item} className="group flex items-center text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer text-sm">
                  <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-6 group-hover:ml-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-semibold">Social Connect</h3>
            <div className="flex flex-wrap gap-4">
              {[Facebook, Linkedin, Twitter, Github].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all border border-white/10"
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </div>
            <div className="flex items-center space-x-3 text-gray-400 text-sm">
              <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                <Mail size={18} className="text-cyan-400" />
              </div>
              <span className="break-all">hello@choicetech.com</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6"
        >
          <p className="text-[10px] md:text-xs text-gray-500 tracking-widest uppercase text-center sm:text-left">
            © {currentYear} Choice Technology. All rights reserved.
          </p>
          <div className="flex space-x-6 text-[10px] md:text-xs text-gray-500">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;