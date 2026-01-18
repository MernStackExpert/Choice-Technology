import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThreeBackground from "@/Components/bg-mouse-effect/ThreeBackground";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Choice Technology",
  description: "Tech Service Provider",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen relative">
          <div className="fixed inset-0 z-0">
          <ThreeBackground />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
        <div>
          <Navbar />
        </div>

        <main className="flex-grow mt-20 max-w-7xl mx-auto">
          {children}
        </main>

        <footer>
          <Footer/>
        </footer>

        </div>

        </div>
      </body>
    </html>
  );
}