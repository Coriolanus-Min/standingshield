"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Check } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!selectedColor.available) return;
    addItem(product.id, selectedColor.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    openCart();
  };

  const gallery = selectedColor?.gallery?.length
    ? selectedColor.gallery
    : [selectedColor?.image || product.colors[0]?.image || "/images/tumbler_midnight_black_1772804852319.png"];

  const currentImage = gallery[activeImageIndex] || gallery[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-[#0f0f0f] rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-colors"
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-orange-500 text-black text-xs font-bold uppercase tracking-wider rounded-full">
          {product.badge}
        </div>
      )}

      {/* Image Area */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-square bg-gradient-to-b from-white/[0.03] to-transparent p-6">
        <img
          src={currentImage}
          alt={`${product.name} - ${selectedColor?.name || ""}`}
          className={`w-full h-full rounded-xl group-hover:scale-105 transition-transform duration-500 ${
            activeImageIndex === 0 ? "object-contain" : "object-cover"
          }`}
        />
      </Link>

      {/* Gallery Thumbnails (4-Image Set Switcher) */}
      {gallery.length > 1 && (
        <div className="px-6 pt-2 flex items-center gap-2">
          {gallery.map((imgSrc, idx) => (
            <button
              key={`${selectedColor.id}-card-thumb-${idx}`}
              type="button"
              onClick={() => setActiveImageIndex(idx)}
              className={`w-12 h-12 rounded-lg overflow-hidden border transition-all flex-shrink-0 bg-white/[0.03] ${
                activeImageIndex === idx
                  ? "border-orange-500 ring-1 ring-orange-500/40 opacity-100"
                  : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
              }`}
              title={`View image ${idx + 1}`}
            >
              <img
                src={imgSrc}
                alt={`${product.name} thumbnail ${idx + 1}`}
                className={`w-full h-full ${idx === 0 ? "object-contain p-1" : "object-cover"}`}
              />
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-xl font-serif text-white tracking-wide mb-1 group-hover:text-orange-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-3">{product.subtitle}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? "text-orange-500 fill-orange-500"
                    : "text-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-500 text-xs">{product.rating}</span>
          <span className="text-gray-600 text-xs">({product.reviewCount})</span>
        </div>

        {/* Color Selector */}
        <div className="flex items-center gap-2 mb-4">
          {product.colors.map((color) => (
            <button
              key={color.id}
              onClick={() => {
                if (color.available) {
                  setSelectedColor(color);
                  setActiveImageIndex(0);
                }
              }}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                selectedColor.id === color.id
                  ? "border-white scale-110"
                  : "border-transparent hover:border-white/30"
              } ${!color.available ? "opacity-30 cursor-not-allowed" : ""}`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            >
              {selectedColor.id === color.id && (
                <Check
                  className={`w-3 h-3 mx-auto ${
                    ["white", "oatmeal", "silver", "pink-cat", "cow", "cream", "ombre", "couture-pink", "sage"].includes(color.id)
                      ? "text-black"
                      : "text-white"
                  }`}
                />
              )}
            </button>
          ))}
          <span className="text-xs text-gray-400 ml-1">{selectedColor.name}</span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-medium text-white">${product.price.toFixed(2)}</span>
            <span className="text-xs text-gray-500 block">Min. {product.minOrder} units</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={added}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm tracking-wide transition-all ${
              added
                ? "bg-green-500 text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" /> Add
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
