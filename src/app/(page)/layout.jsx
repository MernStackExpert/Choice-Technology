import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export default function PageLayout({ children }) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header>
          <Navbar />
        </header>
        <main className="flex-grow mt-20 max-w-7xl mx-auto">{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}
