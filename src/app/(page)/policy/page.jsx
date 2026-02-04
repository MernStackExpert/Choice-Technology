"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Eye,
  Share2,
  RefreshCcw,
  Mail,
  Code,
  Rocket,
  UserCheck,
  Terminal,
  HelpCircle,
  HardDrive,
  Copyright,
  BadgeDollarSign,
  HeartHandshake,
  Database,
  Gavel,
  ShieldAlert,
  Fingerprint,
  AlertTriangle,
  Scale,
  ShieldOff,
} from "lucide-react";

const PolicyPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div className="min-h-screen text-white selection:bg-cyan-500/30 pb-24 relative z-10">
      <header className="pt-32 pb-20 px-6 text-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-md mb-6"
        >
          <ShieldCheck size={14} className="text-cyan-400" />
          <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">
            Legal_Protocols
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6"
        >
          Privacy & <span className="text-cyan-500 italic">Service</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] max-w-2xl mx-auto leading-relaxed"
        >
          Arshe Technology Neural Framework Guidelines
        </motion.p>
      </header>

      <main className="max-w-7xl mx-auto px-6 space-y-32">
        <section>
          <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-6">
            <Lock className="text-cyan-500" size={24} />
            <h2 className="text-2xl font-black uppercase tracking-widest">
              Privacy_Policy
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <PolicyCard
              icon={<Eye size={20} />}
              title="Data Metrics"
              desc="Collection of identity units and telemetry via encrypted nodes."
            />
            <PolicyCard
              icon={<Terminal size={20} />}
              title="Operational Use"
              desc="Processing data to optimize neural links and secure service delivery."
            />
            <PolicyCard
              icon={<Share2 size={20} />}
              title="Zero Sharing"
              desc="Information remains within the cluster. No unauthorized data leakage."
            />
            <PolicyCard
              icon={<ShieldCheck size={20} />}
              title="Security Shield"
              desc="Industrial-grade encryption applied to all incoming data transmissions."
            />
          </motion.div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-6">
            <Code className="text-blue-500" size={24} />
            <h2 className="text-2xl font-black uppercase tracking-widest">
              Service_Protocols
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <ServiceItem
              num="01"
              icon={<Database size={20} />}
              title="Requirement Sync"
              desc="Approved Scope of Work is mandatory before node deployment."
            />
            <ServiceItem
              num="02"
              icon={<Rocket size={20} />}
              title="Deployment"
              desc="Structured development cycles with real-time feedback loops."
            />
            <ServiceItem
              num="03"
              icon={<UserCheck size={20} />}
              title="Handover"
              desc="Transmission of credentials and documentation upon final clearance."
            />
            <ServiceItem
              num="04"
              icon={<RefreshCcw size={20} />}
              title="Change Policy"
              desc="Post-handover modifications require new logic and authorization."
            />
            <ServiceItem
              num="05"
              icon={<HelpCircle size={20} />}
              title="Tech Support"
              desc="Lifetime support for original code integrity and core bug fixes."
            />
            <ServiceItem
              num="06"
              icon={<HardDrive size={20} />}
              title="Maintenance"
              desc="Optional security patches and performance optimization plans."
            />
            <ServiceItem
              num="07"
              icon={<Copyright size={20} />}
              title="Ownership"
              desc="Users hold usage licenses. Source resale or reuse is prohibited."
            />
            <ServiceItem
              num="08"
              icon={<BadgeDollarSign size={20} />}
              title="Financials"
              desc="Milestone payments are non-refundable after node delivery."
            />
            <ServiceItem
              num="09"
              icon={<HeartHandshake size={20} />}
              title="Confidentiality"
              desc="Encrypted data integrity. NDAs available for enterprise clusters."
            />
          </motion.div>
        </section>

        <section className="relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-14 bg-rose-500/5 border border-rose-500/20 rounded-[3rem] backdrop-blur-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 opacity-5">
              <ShieldAlert size={200} className="text-rose-500" />
            </div>

            <div className="flex items-center gap-4 mb-10 border-b border-rose-500/10 pb-6">
              <Gavel className="text-rose-500" size={28} />
              <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-rose-500 italic">
                Cyber_Enforcement_Protocol
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
              <div className="space-y-6">
                <div className="flex gap-4 p-6 bg-black/40 border border-white/5 rounded-3xl">
                  <ShieldOff className="text-rose-400 shrink-0" size={20} />
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                    Unauthorized distribution, data manipulation, or sharing of
                    Arshe Technology neural assets is a federal offense. Under
                    the{" "}
                    <span className="text-rose-500 font-black">
                      Cyber Security Act
                    </span>
                    , offenders face{" "}
                    <span className="text-white">
                      5 to 14 years of imprisonment
                    </span>{" "}
                    and fines ranging from{" "}
                    <span className="text-white">$5,000 to $50,000</span>.
                  </p>
                </div>

                <div className="flex gap-4 p-6 bg-black/40 border border-white/5 rounded-3xl">
                  <Fingerprint className="text-rose-400 shrink-0" size={20} />
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                    Anonymity is an illusion. Every IP packet, ISP log, and
                    device signature is permanently recorded in our{" "}
                    <span className="text-rose-500">Matrix Core</span>. We
                    maintain direct links with Cyber Crime units; identification
                    and apprehension occur within{" "}
                    <span className="text-white">24 hours</span>.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 p-6 bg-rose-500/10 border border-rose-500/20 rounded-3xl">
                  <AlertTriangle className="text-rose-500 shrink-0" size={20} />
                  <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest leading-relaxed">
                    <span className="text-rose-500 font-black">
                      FINANCIAL FRAUD:
                    </span>{" "}
                    Evasion of payments or fraudulent chargebacks after node
                    deployment triggers immediate asset seizure. We enforce a
                    zero-tolerance policy. Once prosecution begins,{" "}
                    <span className="text-white italic underline">
                      settlement is not an option
                    </span>
                    .
                  </p>
                </div>

                <div className="flex gap-4 p-6 bg-black/40 border border-white/5 rounded-3xl">
                  <Scale className="text-rose-400 shrink-0" size={20} />
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                    Protect your future and your family's social standing. Do
                    not risk a lifetime of legal consequences for temporary
                    gain. We are actively seeking{" "}
                    <span className="text-rose-500 font-black">
                      "Exemplary Punishment"
                    </span>{" "}
                    cases to deter cyber-terrorism and theft.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-rose-500/20 border border-rose-500/40 rounded-2xl">
                <ShieldAlert size={16} className="text-rose-500" />
                <span className="text-[9px] font-black text-rose-500 uppercase tracking-[0.5em] animate-pulse">
                  Final_Termination_Warning
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        <footer className="pt-20 border-t border-white/5 text-center space-y-10">
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-cyan-400 backdrop-blur-sm">
              <Mail size={20} />
            </div>
            <p className="text-lg font-black tracking-widest text-white">
              hellochoicetechnology@gmail.com
            </p>
          </div>
          <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.4em] leading-loose">
            © 2026 Arshe Technology. ALL RIGHTS RESERVED.
          </p>
        </footer>
      </main>
    </div>
  );
};

const PolicyCard = ({ icon, title, desc }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
    className="bg-white/[0.03] border border-white/10 p-8 rounded-[2rem] group hover:border-cyan-500/30 transition-all backdrop-blur-sm"
  >
    <div className="text-cyan-500 mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white mb-2 italic">
      {title}
    </h3>
    <p className="text-[10px] text-gray-500 leading-relaxed font-bold uppercase tracking-widest">
      {desc}
    </p>
  </motion.div>
);

const ServiceItem = ({ num, icon, title, desc }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
    className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] space-y-4 group hover:bg-white/[0.05] transition-all backdrop-blur-sm relative"
  >
    <div className="absolute top-6 right-8 text-2xl font-black text-white/[0.03] italic group-hover:text-cyan-500/10 transition-colors font-mono">
      {num}
    </div>
    <div className="text-cyan-400 group-hover:animate-pulse">{icon}</div>
    <div className="space-y-1">
      <h3 className="text-[12px] font-black uppercase tracking-tighter text-white">
        {title}
      </h3>
      <p className="text-[9px] text-gray-600 font-bold leading-relaxed uppercase tracking-widest">
        {desc}
      </p>
    </div>
  </motion.div>
);

export default PolicyPage;
