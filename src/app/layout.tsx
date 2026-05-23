import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: "Standing Shield - Premium Insulated Drinkware",
    template: "%s | Standing Shield",
  },
  description:
    "Standing Shield: Hardcore insulation meets urban aesthetics. Premium laser-engraved stainless steel tumblers built for the wild, sleek enough for the city. Wholesale B2B.",
  openGraph: {
    title: "Standing Shield - Premium Insulated Drinkware",
    description:
      "Hardcore insulation meets urban aesthetics. Premium tumblers built for the wild, sleek enough for the city.",
    type: "website",
    siteName: "Standing Shield",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Standing Shield",
    description: "Premium laser-engraved insulated tumblers. Built for the wild, sleek enough for the city.",
  },
  keywords: [
    "insulated tumbler",
    "stainless steel drinkware",
    "laser engraved tumbler",
    "wholesale tumblers",
    "vacuum insulated bottle",
    "316L stainless steel",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative overflow-x-clip overscroll-x-none`}
      >
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
