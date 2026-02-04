import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThreeBackground from "@/Components/bg-mouse-effect/ThreeBackground";
import NeuralContactHub from "@/Shared/NeuralContactHub";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Arshe Technology",
  description: "Tech Service Provider",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2245%22 fill=%22none%22 stroke=%22%2306b6d4%22 stroke-width=%228%22 stroke-dasharray=%22220 60%22/><circle cx=%2250%22 cy=%2250%22 r=%2210%22 fill=%22%2306b6d4%22/></svg>",
    apple: [{ url: "/apple-icon.png" }],
  },
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
            <NeuralContactHub />
          </div>
        </div>
      </body>
    </html>
  );
}
