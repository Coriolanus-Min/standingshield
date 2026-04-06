"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-4">
        <button aria-label="Open menu" className="text-white hover:text-orange-500 transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex justify-center">
        <h1 className="text-white font-serif text-2xl md:text-3xl tracking-widest uppercase font-bold text-center">
          Standing <span className="text-orange-500 opacity-80 text-xl md:text-2xl font-light lowercase font-sans block -mt-2">shield</span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={openCart} aria-label="Shopping bag" className="text-white hover:text-orange-500 transition-colors relative">
          <ShoppingBag className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-[10px] font-bold flex items-center justify-center text-white">
            0
          </span>
        </button>
      </div>
    </motion.nav>
  );
}
