"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, RotateCcw, Lock } from "lucide-react";

const promises = [
  {
    icon: Truck,
    title: "Free Global Shipping",
    text: "On wholesale orders over $1,000",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Warranty",
    text: "Every Shield covered, for life",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    text: "No questions. No hassle.",
  },
  {
    icon: Lock,
    title: "Secure Checkout",
    text: "256-bit SSL encrypted payment",
  },
];

export default function TrustBar() {
  return (
    <section className="w-full bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {promises.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-center gap-4 py-6 sm:py-8 px-2 sm:px-6 justify-start sm:justify-center"
            >
              <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <h3 className="text-white text-xs sm:text-sm font-semibold uppercase tracking-wider">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-[11px] sm:text-xs mt-0.5">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
