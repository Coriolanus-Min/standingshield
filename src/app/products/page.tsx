import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductsCatalogClient from "@/components/ProductsCatalogClient";

export const metadata: Metadata = {
  title: "All Products | Standing Shield",
  description:
    "Browse the full 6-series Standing Shield collection — premium laser-engraved insulated drinkware for every scene.",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen w-full max-w-[100vw] overflow-x-clip bg-black">
      <Navbar />
      <ProductsCatalogClient />
      <Footer />
    </main>
  );
}
