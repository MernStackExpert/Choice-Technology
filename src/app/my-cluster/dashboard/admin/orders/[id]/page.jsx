import AdminOrderDetailsController from "@/Components/ADMIN/Orders/AdminOrderDetailsController";

export const metadata = {
  title: "Order Intelligence Details | Admin",
};

export default async function OrderDetailsPage({ params }) {

  const { id } = await params;

  return (
    <div className="w-full min-h-screen pt-24 pb-12">
      <AdminOrderDetailsController id={id} />
    </div>
  );
}