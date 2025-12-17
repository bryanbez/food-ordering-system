import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food Ordering System",
  description: "A premium food ordering experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col ml-[15%]">
            {" "}
            {/* margin left matches sidebar width */}
            <Navbar />
            <main className="p-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
