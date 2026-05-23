"use client";

import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

export default function ProductsGrid() {
  return (
    <section className="w-full bg-black pt-20 md:pt-32 pb-0">
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
            The Collection
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-serif text-white uppercase tracking-wider mb-4">
            Choose Your Shield
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Three sizes. One uncompromising standard. Engineered for every scene, built to last a lifetime.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* B2B CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm mb-4">
            Looking for custom laser engraving or bulk orders above 1,000 units?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 text-white rounded-full hover:bg-white/5 transition-colors text-sm tracking-wide"
          >
            Request Custom Quote
          </a>
        </motion.div>
      </div>
    </section>
  );
}
