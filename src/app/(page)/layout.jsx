import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export default function PageLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-grow mt-20 max-w-7xl mx-auto">
        {children}
      </main>
      <Footer />
    </>
  );
}