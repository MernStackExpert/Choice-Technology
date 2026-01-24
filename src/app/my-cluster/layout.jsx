import ClusterClientWrapper from "@/Components/Cluster/ClusterClientWrapper";
import AuthProvider from "@/Provider/AuthProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "My Cluster - Choice Technology",
  description: "Manage your digital instances and cluster settings.",
};

export default function ClusterLayout({ children }) {
  return (
    <AuthProvider>
      <ClusterClientWrapper>
        {children}
      </ClusterClientWrapper>
      <Toaster position="bottom-right" />
    </AuthProvider>
  );
}