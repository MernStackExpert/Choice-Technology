import ServicesClient from "./ServicesClient";

export const metadata = {
  title: "Premium Services | Choice Technology",
  description: "Affordable web solutions, from free websites to full premium packages by Choice Technology.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <div className="relative z-10">
        <ServicesClient />
      </div>
    </main>
  );
}