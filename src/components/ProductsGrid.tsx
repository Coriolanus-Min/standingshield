"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Scale } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

export default function ProductsGrid() {
  // Symbolic showcase on Home page: feature the top 3 flagship models
  const featuredProducts = products.slice(0, 3);

  return (
    <section className="w-full max-w-[100vw] overflow-x-clip bg-black pt-20 md:pt-32 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-orange-500 tracking-widest uppercase text-sm font-semibold mb-3">
            Featured Flagships
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-serif text-white uppercase tracking-wider mb-4">
            Choose Your Shield
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Three flagship silhouettes from our six-series lineup. Engineered for every scene, built to last a lifetime.
          </p>
        </motion.div>

        {/* Symbolic 3-Product Featured Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Full Catalog & B2B CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 flex flex-col items-center text-center gap-6"
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-all text-sm tracking-wide shadow-[0_0_25px_rgba(255,255,255,0.15)]"
            >
              Explore Full Collection ({products.length} Series)
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-7 py-4 border border-white/20 text-white rounded-full hover:bg-white/5 transition-colors text-sm tracking-wide"
            >
              <Scale className="w-4 h-4 text-orange-500" />
              Compare All Models
            </Link>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm">
            Looking for custom laser engraving or bulk OEM orders above 1,000 units?{" "}
            <Link href="/contact" className="text-orange-400 hover:text-orange-300 underline underline-offset-4">
              Request Custom Quote →
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
