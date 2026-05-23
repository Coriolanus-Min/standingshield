"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Minus } from "lucide-react";
import { products } from "@/data/products";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function CompareClient() {
  const allSpecs = Array.from(
    new Set(products.flatMap((p) => Object.keys(p.specs)))
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-28 pb-8 px-6 md:px-12 max-w-7xl mx-auto">
        <Link
          href="/#products"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collection
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-orange-500 tracking-widest uppercase text-sm font-semibold mb-3">
            Compare
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Find Your Shield
          </h1>
          <p className="text-gray-400 max-w-lg">
            Compare specs side-by-side to find the perfect tumbler for your market.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr>
                <th className="text-left p-4 border-b border-white/10 w-1/4">
                  <span className="text-gray-500 text-sm uppercase tracking-wider">
                    Feature
                  </span>
                </th>
                {products.map((product) => (
                  <th
                    key={product.id}
                    className="p-4 border-b border-white/10 text-center w-1/4"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-gradient-to-b from-white/5 to-transparent rounded-xl flex items-center justify-center mb-3">
                        <img
                          src={product.colors[0].image}
                          alt={product.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <h3 className="text-white font-medium">{product.name}</h3>
                      <p className="text-gray-500 text-xs">{product.subtitle}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Price */}
              <tr>
                <td className="p-4 border-b border-white/5 text-gray-400 text-sm">
                  Price
                </td>
                {products.map((p) => (
                  <td
                    key={p.id}
                    className="p-4 border-b border-white/5 text-center"
                  >
                    <span className="text-xl font-medium text-white">
                      ${p.price.toFixed(2)}
                    </span>
                    <span className="text-gray-500 text-xs block">/ unit</span>
                  </td>
                ))}
              </tr>

              {/* MOQ */}
              <tr>
                <td className="p-4 border-b border-white/5 text-gray-400 text-sm">
                  Min. Order
                </td>
                {products.map((p) => (
                  <td
                    key={p.id}
                    className="p-4 border-b border-white/5 text-center text-white"
                  >
                    {p.minOrder} units
                  </td>
                ))}
              </tr>

              {/* Rating */}
              <tr>
                <td className="p-4 border-b border-white/5 text-gray-400 text-sm">
                  Rating
                </td>
                {products.map((p) => (
                  <td
                    key={p.id}
                    className="p-4 border-b border-white/5 text-center text-white"
                  >
                    {p.rating} / 5
                  </td>
                ))}
              </tr>

              {/* Specs */}
              {allSpecs.map((specKey) => (
                <tr key={specKey}>
                  <td className="p-4 border-b border-white/5 text-gray-400 text-sm">
                    {specKey}
                  </td>
                  {products.map((p) => (
                    <td
                      key={p.id}
                      className="p-4 border-b border-white/5 text-center text-white text-sm"
                    >
                      {p.specs[specKey] || (
                        <Minus className="w-4 h-4 text-gray-700 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Features count */}
              <tr>
                <td className="p-4 border-b border-white/5 text-gray-400 text-sm">
                  Key Features
                </td>
                {products.map((p) => (
                  <td
                    key={p.id}
                    className="p-4 border-b border-white/5 text-center"
                  >
                    <div className="flex flex-col gap-1">
                      {p.features.slice(0, 4).map((f, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 justify-center text-xs text-gray-300"
                        >
                          <Check className="w-3 h-3 text-orange-500 flex-shrink-0" />
                          <span className="truncate max-w-[180px]">{f}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* CTA */}
              <tr>
                <td className="p-4" />
                {products.map((p) => (
                  <td key={p.id} className="p-4 text-center">
                    <Link
                      href={`/products/${p.slug}`}
                      className="inline-block px-6 py-2.5 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                    >
                      View Details
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
