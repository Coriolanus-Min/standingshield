"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("done");
  };

  return (
    <section className="w-full bg-black py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-12 sm:px-12 sm:py-16 text-center"
        >
          {/* Soft orange glow accent */}
          <div
            aria-hidden
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[220px] rounded-full bg-orange-500/10 blur-3xl pointer-events-none"
          />

          <div className="relative">
            <p className="text-orange-500 tracking-widest uppercase text-xs sm:text-sm font-semibold mb-3">
              Join the Caravan
            </p>
            <h2 className="text-2xl sm:text-4xl font-serif text-white uppercase tracking-wider mb-4">
              First to Know, First to Carry
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-8 text-sm sm:text-base">
              New colorways, limited engravings and wholesale pricing drops — straight to your inbox. No noise, just the Shield.
            </p>

            {status === "done" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm"
              >
                <Check className="w-4 h-4" />
                You&apos;re in. Welcome to the caravan.
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto"
                noValidate
              >
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="your@email.com"
                    className={`w-full h-full px-5 py-3.5 rounded-full bg-black/60 border text-white text-sm placeholder:text-gray-600 focus:outline-none transition-colors ${
                      status === "error"
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-white/15 focus:border-orange-500/60"
                    }`}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-black font-medium text-sm tracking-wide rounded-full hover:bg-gray-100 transition-colors"
                >
                  Subscribe <Send className="w-4 h-4" />
                </motion.button>
              </form>
            )}

            {status === "error" && (
              <p className="text-red-400/90 text-xs mt-3">
                Please enter a valid email address.
              </p>
            )}
            {status !== "done" && (
              <p className="text-gray-600 text-xs mt-4">
                No spam. Unsubscribe anytime.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
