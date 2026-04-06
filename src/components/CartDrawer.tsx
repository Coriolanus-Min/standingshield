"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShoppingBag, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";

const colors = [
  { id: "black", name: "Midnight Black", hex: "#111111", image: "/images/tumbler_midnight_black_1772804852319.png", available: true },
  { id: "grey", name: "Meteorite Grey", hex: "#4a4a4a", image: "/images/tumbler_meteorite_grey_1772804871359.png", available: true },
  { id: "oatmeal", name: "Oatmeal Beige", hex: "#dcd6cd", image: "/images/tumbler_oatmeal_1772804907053.png", available: true },
  { id: "white", name: "Glacier White", hex: "#f8f9fa", image: "/images/tumbler_oatmeal_1772804907053.png", available: false }, // Fallback to oatmeal image for now
];

export default function CartDrawer() {
  const { isCartOpen, closeCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Sliding Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-[#0a0a0a] shadow-[0_0_50px_rgba(0,0,0,0.5)] z-50 flex flex-col border-l border-white/10"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-xl font-serif font-bold tracking-wider uppercase flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                Your Selection
              </h2>
              <button 
                onClick={closeCart}
                aria-label="Close cart"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6">
              
              {/* Product Preview Image Block */}
              <div className="relative w-full aspect-square bg-gradient-to-b from-white/5 to-transparent rounded-2xl flex items-center justify-center p-8 mb-8 border border-white/5">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={selectedColor.id}
                    src={selectedColor.image}
                    alt={selectedColor.name}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.4 }}
                    className="max-h-full object-contain filter drop-shadow-2xl"
                  />
                </AnimatePresence>
                
                {/* Brand Logo Overlay on Canvas */}
                <div className="absolute top-4 left-4 mix-blend-overlay opacity-30 pointer-events-none">
                    <span className="font-serif text-3xl font-bold tracking-widest uppercase">ST</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="mb-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-serif text-white tracking-wide">30oz Shield Tumbler</h3>
                  <span className="text-xl font-medium">$39.99<span className="text-sm text-gray-500">/unit</span></span>
                </div>
                <p className="text-sm text-gray-400 mb-4">Minimum Wholesale Order: 100 units</p>
                
                <div className="flex items-center text-xs text-orange-400 bg-orange-500/10 px-3 py-2 rounded-lg gap-2 border border-orange-500/20">
                    <Truck className="w-4 h-4" />
                    Ships globally via connected wholesale partners in 3-5 days.
                </div>
              </div>

              {/* Color Selector */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-gray-300">Color Explorer</h4>
                  <span className="text-sm text-white font-medium">{selectedColor.name}</span>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => color.available && setSelectedColor(color)}
                      className={`relative aspect-square rounded-full flex items-center justify-center transition-all ${
                        selectedColor.id === color.id 
                          ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                          : "hover:scale-105 hover:ring-1 hover:ring-white/50"
                      } ${!color.available ? "opacity-30 cursor-not-allowed" : ""}`}
                      style={{ backgroundColor: color.hex }}
                      title={!color.available ? "Out of Stock" : color.name}
                    >
                        {selectedColor.id === color.id && (
                            <Check className={`w-5 h-5 ${color.id === 'white' || color.id === 'oatmeal' ? 'text-black' : 'text-white'}`} />
                        )}
                        {!color.available && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-[2px] bg-red-500 transform rotate-45"></div>
                            </div>
                        )}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer Checkout Area */}
            <div className="p-6 border-t border-white/10 bg-black">
                <p className="text-xs text-center text-gray-500 mb-4 tracking-wide uppercase">Select a partner to proceed</p>
                <div className="grid grid-cols-2 gap-3">
                    <button className="w-full py-3 bg-[#ff9900] text-black font-bold tracking-wide rounded-lg hover:brightness-110 transition-all flex justify-center items-center">
                        Amazon B2B
                    </button>
                    <button className="w-full py-3 bg-[#FF6A00] text-white font-bold tracking-wide rounded-lg hover:brightness-110 transition-all flex justify-center items-center">
                        Alibaba
                    </button>
                </div>
                <button className="w-full mt-3 py-3 border border-white/20 text-white font-medium tracking-wide rounded-lg hover:bg-white/5 transition-all text-sm">
                    Request Custom Quote (1000+ units)
                </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
