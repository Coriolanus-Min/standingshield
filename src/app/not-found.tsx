"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-8xl md:text-9xl font-serif text-white mb-4 opacity-20">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            The page you are looking for does not exist or has been moved. Let us get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              href="/#products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white rounded-full hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Browse Products
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
