import AdminOverviewController from "./AdminOverviewController";


export const metadata = {
  title: "Admin Command Center | Choice Technology",
  description: "High-level overview of system revenue, node status, and neural network performance.",
};

export default function AdminOverview() {
  return (
    <div className="w-full min-h-screen">
      <AdminOverviewController />
    </div>
  );
}