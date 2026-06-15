import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/nav/TopNav";
import Footer from "@/components/nav/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SalonPro Elite | Luxury Unisex Salon",
  description:
    "SalonPro Elite — Premium Unisex Salon & Spa. Book appointments, explore membership plans, and experience luxury grooming and beauty services.",
  keywords: [
    "luxury salon",
    "unisex salon",
    "spa",
    "hair salon Kolkata",
    "bridal makeup",
    "salon membership",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-black text-white min-h-screen flex flex-col">
        <TopNav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
