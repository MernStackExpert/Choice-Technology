import ActiveOrdersController from "@/Components/ADMIN/Orders/ActiveOrdersController";

export const metadata = {
  title: "Active Node Stream | Arshe Technology",
  description: "Monitoring operational synchronized nodes",
};

export default function ActiveNodesPage() {
  return (
    <div className="w-full min-h-screen pt-24 pb-20">
      <ActiveOrdersController />
    </div>
  );
}
