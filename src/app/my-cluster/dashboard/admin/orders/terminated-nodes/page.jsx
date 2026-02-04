import TerminatedNodesController from "@/Components/ADMIN/Orders/TerminatedNodesController";

export const metadata = {
  title: "Archive Vault | Arshe Technology",
};

export default function TerminatedNodesPage() {
  return (
    <div className="w-full min-h-screen pt-24 pb-20">
      <TerminatedNodesController />
    </div>
  );
}
