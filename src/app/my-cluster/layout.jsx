import ClusterNavbar from "@/Components/Cluster/ClusterNavbar";
import AuthProvider from "@/Provider/AuthProvider";
import { Toaster } from "react-hot-toast";

export default function ClusterLayout({ children }) {
  return (
    <div className="relative min-h-screen">
      <AuthProvider>
        <ClusterNavbar />
        <main className="pt-32">{children}</main>
        <Toaster />
      </AuthProvider>
    </div>
  );
}
