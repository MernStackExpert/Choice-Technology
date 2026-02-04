import ClusterClientWrapper from "@/Components/Cluster/ClusterClientWrapper";
import PrivateRoute from "@/Privet_Route/PrivateRoute";
import AuthProvider from "@/Provider/AuthProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "My Cluster - Arshe Technology",
  description: "Manage your digital instances and cluster settings.",
};

export default function ClusterLayout({ children }) {
  return (
    <AuthProvider>
      <PrivateRoute>
        <ClusterClientWrapper>{children}</ClusterClientWrapper>
      </PrivateRoute>
      <Toaster position="bottom-right" />
    </AuthProvider>
  );
}
