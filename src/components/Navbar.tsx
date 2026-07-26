"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingBag, X, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import SearchOverlay from "./SearchOverlay";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { openCart, totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 grid grid-cols-3 items-center px-6 md:px-12 py-6 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent"
        }`}
      >
        {/* 1. Left Section (1/3 width) */}
        <div className="flex items-center justify-start gap-4">
          <button
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(true)}
            className="text-white hover:text-orange-500 transition-colors md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition-colors tracking-widest uppercase font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* 2. Center Section (Perfectly Centered) */}
        <div className="flex justify-center">
          <Link href="/" className="flex flex-col items-center group">
            <h1 className="text-white font-serif text-2xl md:text-3xl tracking-[0.2em] uppercase font-bold leading-none text-center">
              Standing
            </h1>
            <span className="text-orange-500 opacity-90 text-[10px] md:text-xs font-light lowercase font-sans tracking-[0.6em] mt-1.5 transition-all group-hover:tracking-[0.8em]">
              shield
            </span>
          </Link>
        </div>

        {/* 3. Right Section (1/3 width) */}
        <div className="flex items-center justify-end gap-4 md:gap-6">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="text-white hover:text-orange-500 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={openCart}
            aria-label="Shopping bag"
            className="text-white hover:text-orange-500 transition-colors relative"
          >
            <ShoppingBag className="w-6 h-6" />
            <AnimatePresence mode="popLayout">
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-orange-500 rounded-full text-[10px] font-bold flex items-center justify-center text-white px-1"
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] md:hidden"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-white font-serif text-xl tracking-widest uppercase font-bold">
                  Standing <span className="text-orange-500">shield</span>
                </h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-3xl font-serif text-white hover:text-orange-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-8 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openCart();
                  }}
                  className="flex items-center gap-3 text-white"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="text-lg">Cart ({totalItems})</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
