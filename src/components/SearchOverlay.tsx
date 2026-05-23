"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { products } from "@/data/products";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[70] flex flex-col items-center pt-24 md:pt-32 px-6"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Search Input */}
          <div className="w-full max-w-2xl relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, sizes, features..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white text-lg placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 text-xs text-gray-600 bg-white/5 px-2 py-1 rounded">
              <span className="text-gray-400">ESC</span> to close
            </div>
          </div>

          {/* Results */}
          <div className="w-full max-w-2xl mt-6 overflow-y-auto max-h-[60vh]">
            {query.trim() && results.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                No products found for &quot;{query}&quot;
              </p>
            )}

            <div className="space-y-3">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 bg-white/[0.03] hover:bg-white/[0.06] rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors group"
                >
                  <div className="w-14 h-14 flex-shrink-0 bg-gradient-to-b from-white/5 to-transparent rounded-lg flex items-center justify-center">
                    <img
                      src={product.colors[0].image}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium group-hover:text-orange-400 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-gray-500 text-sm truncate">
                      {product.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-white font-medium">
                      ${product.price.toFixed(2)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-orange-500 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
