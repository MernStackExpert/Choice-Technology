import AdminRoute from "@/Privet_Route/AdminRoute"


export default function AdminLayout({ children }) {
  return (
    <AdminRoute>
      <section className="admin-neural-interface">
        {children}
      </section>
    </AdminRoute>
  );
}