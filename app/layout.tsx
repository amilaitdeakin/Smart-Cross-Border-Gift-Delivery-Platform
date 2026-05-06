import Footer from "@/components/footer";
import Header from "@/components/header";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LankaToAus - Cross Border Gift Delivery",
  description:
    "Send gifts from Sri Lanka to Australia. Flowers, cakes, chocolates and custom gifts delivered with love across borders.",
  keywords:
    "gift delivery sri lanka, send gifts to australia, cross border delivery, sri lankan gifts, flowers delivery australia",
};

// Navigation menu items for mega menu

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Main Header */}
        <Header />

        {/* Main Content */}
        <main className="grow">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
