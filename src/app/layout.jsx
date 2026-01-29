import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThreeBackground from "@/Components/bg-mouse-effect/ThreeBackground";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <div className="flex flex-col min-h-screen relative">
          {/* Global 3D Background */}
          <div className="fixed inset-0 z-0">
            <ThreeBackground />
          </div>
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}