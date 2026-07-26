import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "All Products | Standing Shield",
  description:
    "Browse the full Standing Shield collection — premium laser-engraved insulated tumblers in 20oz, 30oz, and 40oz sizes.",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <section className="pt-32 pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-orange-500 tracking-widest uppercase text-sm font-semibold mb-3">
            The Collection
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white uppercase tracking-wider mb-4">
            Choose Your Shield
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Three sizes. One uncompromising standard. Engineered for every scene, built to last a lifetime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm mb-4">
            Looking for custom laser engraving or bulk orders above 1,000 units?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 text-white rounded-full hover:bg-white/5 transition-colors text-sm tracking-wide"
          >
            Request Custom Quote
          </a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
