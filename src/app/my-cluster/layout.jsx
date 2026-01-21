import ClusterNavbar from "@/Components/Cluster/ClusterNavbar";

export default function ClusterLayout({ children }) {
  return (
    <div className="relative min-h-screen">
      <ClusterNavbar />
      <main className="pt-32">
        {children}
      </main>

    </div>
  );
}