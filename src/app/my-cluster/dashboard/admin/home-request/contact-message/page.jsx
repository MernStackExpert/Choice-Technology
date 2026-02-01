import ManageContactMessages from "@/Components/ADMIN/ADMIN_PAGES/ManageContactMessages/ManageContactMessages";

export const metadata = {
  title: "Comm Link | Admin Panel",
  description: "Monitor and manage all pending neural transmissions and inquiries.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContactMessagesPage() {
  return (
    <div className="w-full min-h-screen pt-24">
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-cyan-500/10 blur-[120px] -z-10 rounded-full" />
      </div>
      
      <ManageContactMessages />
    </div>
  );
}