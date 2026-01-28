import ClusterHero from "@/Components/Cluster_Home/ClusterHero/ClusterHero";
import NodeStatus from "@/Components/Cluster_Home/NodeStatus/NodeStatus";

// This is a Server Component for SEO
export default function MyClusterPage() {
  return (
    <main className="relative min-h-screen selection:bg-cyan-500/30">
      {/* Server side rendered hero */}
      <ClusterHero />

      <div className="max-w-7xl mx-auto px-6 space-y-20 pb-32">
        {/* Client side logic wrapped inside this component */}
        <NodeStatus />

      </div>
    </main>
  );
}