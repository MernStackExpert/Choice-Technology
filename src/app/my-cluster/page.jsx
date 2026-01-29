import ClusterHero from "@/Components/Cluster_Home/ClusterHero/ClusterHero";
import MotivationalSection from "@/Components/Cluster_Home/MotivationalSection/MotivationalSection";
import NodeStatus from "@/Components/Cluster_Home/NodeStatus/NodeStatus";
import NodeTracker from "@/Components/Cluster_Home/NodeTracker/NodeTracker";
import SecurityAudit from "@/Components/Cluster_Home/SecurityAudit/SecurityAudit";
import ServiceRoadmap from "@/Components/Cluster_Home/ServiceRoadmap/ServiceRoadmap";

// This is a Server Component for SEO
export default function MyClusterPage() {
  return (
    <main className="relative min-h-screen selection:bg-cyan-500/30">
      {/* Server side rendered hero */}
      <ClusterHero />

        {/* Client side logic wrapped inside this component */}
        <NodeStatus />

        <NodeTracker/>

        <SecurityAudit/>

        <ServiceRoadmap/>

        <MotivationalSection/>


      
    </main>
  );
}