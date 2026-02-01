import ArchiveMessages from "@/Components/ADMIN/ADMIN_PAGES/ArchiveMessages/ArchiveMessages";

export const metadata = {
  title: "Neural Archive | Admin Storage",
  description: "Access and manage all resolved communications and startup requests.",
  robots: { index: false, follow: false },
};

export default function ArchivePage() {
  return (
    <div className="w-full min-h-screen pt-24 pb-20 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-500/5 to-transparent -z-10" />
      <ArchiveMessages />
    </div>
  );
}