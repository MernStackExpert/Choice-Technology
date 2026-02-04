import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact Us | Arshe Technology",
  description:
    "Get in touch with Arshe Technology for custom web development, managed subscriptions, or partnership opportunities.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactClient />
    </main>
  );
}
