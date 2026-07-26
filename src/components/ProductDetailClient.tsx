"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowLeft, Award, Box, Check, Image as ImageIcon, Minus, PenLine, Plus, RotateCcw, Shield, ShoppingBag, Star, Truck } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Tumbler3D = dynamic(() => import("./Tumbler3D"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-gray-600 text-sm uppercase tracking-widest animate-pulse">
      Loading 3D…
    </div>
  ),
});

// Pull a numeric value out of spec strings like "21.5cm"
function parseSpecNumber(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : fallback;
}

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem, openCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(product.minOrder);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "features">("features");
  const [viewMode, setViewMode] = useState<"photo" | "3d">("photo");
  const [engraving, setEngraving] = useState("");

  const handleAddToCart = () => {
    if (!selectedColor.available) return;
    addItem(product.id, selectedColor.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    openCart();
  };

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-28 pb-4 px-6 md:px-12 max-w-7xl mx-auto">
        <Link
          href="/#products"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collection
        </Link>
      </div>

      {/* Product Hero */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image / Interactive 3D */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square min-h-[320px] bg-gradient-to-b from-white/[0.03] to-transparent rounded-3xl flex items-center justify-center p-6 sm:p-12 border border-white/5 overflow-hidden"
            >
              {viewMode === "photo" ? (
                <motion.img
                  key={selectedColor.id}
                  src={selectedColor.image}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Tumbler3D
                    colorHex={selectedColor.hex}
                    colorName={selectedColor.name}
                    heightCm={parseSpecNumber(product.specs.Height, 21.5)}
                    diameterCm={parseSpecNumber(product.specs.Diameter, 8.5)}
                    heightLabel={product.specs.Height ?? "—"}
                    diameterLabel={product.specs.Diameter ?? "—"}
                    capacityLabel={product.specs.Capacity ?? product.capacity}
                    weightLabel={product.specs.Weight ?? "—"}
                    engravingText={engraving}
                    showDimensions={false}
                  />
                </motion.div>
              )}

              {product.badge && viewMode === "photo" && (
                <div className="absolute top-6 left-6 z-10 px-4 py-1.5 bg-orange-500 text-black text-xs font-bold uppercase tracking-wider rounded-full">
                  {product.badge}
                </div>
              )}

              {/* Photo / 3D toggle */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full p-1">
                <button
                  onClick={() => setViewMode("photo")}
                  aria-pressed={viewMode === "photo"}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                    viewMode === "photo" ? "bg-white text-black" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" /> Photo
                </button>
                <button
                  onClick={() => setViewMode("3d")}
                  aria-pressed={viewMode === "3d"}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                    viewMode === "3d" ? "bg-orange-500 text-black" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Box className="w-3.5 h-3.5" /> 3D
                </button>
              </div>
            </motion.div>

            {/* Live engraving preview (3D mode) */}
            {viewMode === "3d" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mt-4 bg-white/[0.02] border border-white/5 rounded-2xl px-5 py-4"
              >
                <label
                  htmlFor="engraving-preview"
                  className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-300"
                >
                  <PenLine className="w-3.5 h-3.5 text-orange-500" />
                  Live Engraving Preview
                </label>
                <input
                  id="engraving-preview"
                  type="text"
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value)}
                  maxLength={18}
                  placeholder="YOUR BRAND HERE"
                  className="mt-3 w-full bg-black/50 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white uppercase tracking-[0.2em] placeholder:text-gray-600 focus:outline-none focus:border-orange-500/60 transition-colors"
                />
                <p className="text-gray-600 text-xs mt-2">
                  Etched below the logo on the model — rotate to view. Complimentary engraving on wholesale orders of 500+ units.
                </p>
              </motion.div>
            )}
          </div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <p className="text-orange-500 tracking-widest uppercase text-sm font-semibold mb-2">
              {product.category}
            </p>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">
              {product.name}
            </h1>
            <p className="text-gray-400 text-lg mb-4">{product.subtitle}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "text-orange-500 fill-orange-500"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-400 text-sm">{product.rating}</span>
              <span className="text-gray-600 text-sm">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <p className="text-gray-300 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-medium">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-gray-500">/ unit</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Minimum wholesale order: {product.minOrder} units
              </p>
            </div>

            {/* Color Selector */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold uppercase tracking-widest text-gray-300">
                  Color
                </span>
                <span className="text-sm text-white">{selectedColor.name}</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => color.available && setSelectedColor(color)}
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      selectedColor.id === color.id
                        ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        : "hover:scale-105 hover:ring-1 hover:ring-white/30"
                    } ${!color.available ? "opacity-30 cursor-not-allowed" : ""}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor.id === color.id && (
                      <Check
                        className={`w-5 h-5 ${
                          color.id === "white" || color.id === "oatmeal"
                            ? "text-black"
                            : "text-white"
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <span className="text-sm font-bold uppercase tracking-widest text-gray-300 mb-3 block">
                Quantity
              </span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-white/5 rounded-full px-2 py-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(product.minOrder, q - 50))}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-white w-16 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 50)}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-gray-500 text-sm">
                  Step: 50 units
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={added}
                className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-full font-medium tracking-wide transition-all ${
                  added
                    ? "bg-green-500 text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" /> Add to Cart — ${(product.price * quantity).toFixed(2)}
                  </>
                )}
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Truck className="w-4 h-4 text-orange-500 flex-shrink-0" />
                Global shipping 3-5 days
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Shield className="w-4 h-4 text-orange-500 flex-shrink-0" />
                Lifetime warranty
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <RotateCcw className="w-4 h-4 text-orange-500 flex-shrink-0" />
                30-day return policy
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Award className="w-4 h-4 text-orange-500 flex-shrink-0" />
                FDA / LFGB certified
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs: Features & Specs */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto pb-16">
        <div className="border-t border-white/10 pt-12">
          <div className="flex gap-8 mb-8">
            <button
              onClick={() => setActiveTab("features")}
              className={`text-sm font-bold uppercase tracking-widest pb-2 border-b-2 transition-colors ${
                activeTab === "features"
                  ? "text-white border-orange-500"
                  : "text-gray-500 border-transparent hover:text-gray-300"
              }`}
            >
              Features
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`text-sm font-bold uppercase tracking-widest pb-2 border-b-2 transition-colors ${
                activeTab === "specs"
                  ? "text-white border-orange-500"
                  : "text-gray-500 border-transparent hover:text-gray-300"
              }`}
            >
              Specifications
            </button>
          </div>

          {activeTab === "features" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {product.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white/[0.02] rounded-xl p-4 border border-white/5"
                >
                  <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Interactive 3D spec viewer */}
              <div className="relative aspect-square lg:aspect-auto lg:min-h-[520px] min-h-[320px] bg-gradient-to-b from-white/[0.03] to-transparent rounded-2xl border border-white/5 overflow-hidden">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 border border-white/10 bg-black/50 backdrop-blur-sm rounded-full px-4 py-1.5">
                    Interactive 3D Model
                  </span>
                </div>
                <Tumbler3D
                  colorHex={selectedColor.hex}
                  colorName={selectedColor.name}
                  heightCm={parseSpecNumber(product.specs.Height, 21.5)}
                  diameterCm={parseSpecNumber(product.specs.Diameter, 8.5)}
                  heightLabel={product.specs.Height ?? "—"}
                  diameterLabel={product.specs.Diameter ?? "—"}
                  capacityLabel={product.specs.Capacity ?? product.capacity}
                  weightLabel={product.specs.Weight ?? "—"}
                  engravingText={engraving}
                />
              </div>

              {/* Spec table */}
              <div className="bg-white/[0.02] rounded-xl border border-white/5 overflow-hidden self-start">
                {Object.entries(product.specs).map(([key, value], i, arr) => (
                  <div
                    key={key}
                    className={`flex justify-between items-center px-6 py-4 ${
                      i !== arr.length - 1 ? "border-b border-white/5" : ""
                    }`}
                  >
                    <span className="text-gray-400 text-sm">{key}</span>
                    <span className="text-white text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="px-6 md:px-12 max-w-7xl mx-auto pb-24">
          <div className="border-t border-white/10 pt-16">
            <h2 className="text-2xl md:text-3xl font-serif text-white uppercase tracking-wider mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className="group flex gap-6 bg-white/[0.02] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-b from-white/5 to-transparent rounded-xl flex items-center justify-center">
                    <img
                      src={p.colors[0].image}
                      alt={p.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-white font-medium group-hover:text-orange-400 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">{p.subtitle}</p>
                    <span className="text-white font-medium">
                      ${p.price.toFixed(2)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
