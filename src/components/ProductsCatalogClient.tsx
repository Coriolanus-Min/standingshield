"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Scale, Sparkles } from "lucide-react";
import { products, getAllCategories } from "@/data/products";
import ProductCard from "./ProductCard";

export default function ProductsCatalogClient() {
  const categories = ["All Series", ...getAllCategories()];
  const [activeCategory, setActiveCategory] = useState("All Series");

  const filteredProducts =
    activeCategory === "All Series"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="pt-32 pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-orange-500 tracking-widest uppercase text-sm font-semibold mb-3">
          The Complete Collection
        </p>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white uppercase tracking-wider mb-4">
          All Six Shield Series
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          From feather-weight commuter bottles and ceramic-lined character vessels to heritage glossy roadster flasks — explore every Standing Shield silhouette.
        </p>
      </div>

      {/* Category Filter Pills & Compare Link */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 md:pb-0 no-scrollbar">
          {categories.map((cat) => {
            const active = activeCategory === cat;
            const count =
              cat === "All Series"
                ? products.length
                : products.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap transition-all ${
                  active
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    : "bg-white/[0.04] text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {cat}{" "}
                <span className={`ml-1 text-[11px] ${active ? "text-gray-600" : "text-gray-500"}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        <Link
          href="/compare"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap"
        >
          <Scale className="w-4 h-4" />
          Compare Specs Side-by-Side
        </Link>
      </div>

      {/* Product Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {filteredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </motion.div>

      {/* B2B OEM Custom Mold Banner */}
      <div className="mt-20 rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.03] via-orange-500/[0.05] to-white/[0.03] p-8 sm:p-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" /> Custom OEM &amp; Laser Etching
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-white uppercase tracking-wider mb-3">
          Need Custom Colorways or Private-Label Tooling?
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto mb-6">
          All 6 Standing Shield mold lines support custom Pantone powder/lacquer finishes, 1-yuan-coin scale laser branding, and retail gift-box packaging starting from 100 units.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors text-sm tracking-wide"
        >
          Request B2B Wholesale Quote
        </Link>
      </div>
    </section>
  );
}
