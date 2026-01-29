import React from "react";
import SecurityAuditContent from "./SecurityAuditContent";

export default function SecurityAudit() {
  return (
    <section className="relative z-10 py-12">
      <div className="flex flex-col mb-10">
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
          Security <span className="text-emerald-400">Audit</span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-transparent mt-2" />
      </div>
      <SecurityAuditContent />
    </section>
  );
}