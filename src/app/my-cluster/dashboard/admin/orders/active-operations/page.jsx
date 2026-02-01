import ActiveOperations from "@/Components/ADMIN/Orders/ActiveOperations";

export const metadata = {
  title: "Ops Matrix | Admin Control",
  description: "Monitor fully funded active deployments and production nodes.",
  robots: { index: false, follow: false },
};

export default function OperationsPage() {
  return (
    <div className="w-full min-h-screen pt-24 pb-20 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full bg-cyan-500/[0.02] blur-[120px] -z-10 rounded-full" />
      <ActiveOperations />
    </div>
  );
}