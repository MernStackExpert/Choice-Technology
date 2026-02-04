import React from "react";
import ClusterHeroContent from "./ClusterHeroContent";

export default function ClusterHero() {
  // All static content for SEO optimization
  const content = {
    title: "NEURAL CLUSTER",
    highlight: "SYSTEMS",
    subtitle: "Cluster Protocol v2.0",
    description:
      "Initialize your connection to the Arshe Technology neural network. Monitor live nodes, manage compute resources, and secure your digital ecosystem in real-time.",
  };

  return (
    <section className="relative z-10 pt-18 max-sm:pt-5 pb-20 px-6 overflow-hidden">
      {/* Background glow specific to Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <ClusterHeroContent content={content} />
      </div>
    </section>
  );
}
