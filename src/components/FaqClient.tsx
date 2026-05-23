"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const faqs = [
  {
    category: "Orders & Wholesale",
    items: [
      {
        q: "What is the minimum order quantity (MOQ)?",
        a: "Our standard MOQ is 100 units per SKU. For custom laser engraving or OEM projects, the MOQ starts at 500 units. Bulk orders above 1,000 units receive tiered pricing discounts.",
      },
      {
        q: "Do you offer custom logo laser engraving?",
        a: "Yes, we specialize in high-precision blue laser engraving. You can submit your logo in vector format (AI, EPS, SVG) and we will provide a digital mockup within 48 hours. Custom engraving MOQ is 500 units.",
      },
      {
        q: "Can I order samples before placing a bulk order?",
        a: "Absolutely. We offer sample packs at wholesale cost plus shipping. Each sample pack includes one unit in each available color. Contact our team to request a sample quotation.",
      },
      {
        q: "What payment methods do you accept for B2B orders?",
        a: "We accept wire transfer (T/T), Letter of Credit (L/C) for large orders, and secure payment via Alibaba Trade Assurance. For established partners, we offer Net-30 terms subject to credit approval.",
      },
    ],
  },
  {
    category: "Shipping & Logistics",
    items: [
      {
        q: "How long does shipping take?",
        a: "Standard production lead time is 15-20 business days after order confirmation and deposit. Express air freight takes 5-7 days, while sea freight takes 25-35 days depending on destination port.",
      },
      {
        q: "Do you ship globally?",
        a: "Yes, we ship to over 60 countries via our connected wholesale partners on Amazon B2B, Alibaba, and direct container dispatch. We handle DDP (Delivered Duty Paid) for most major markets.",
      },
      {
        q: "What are the shipping costs?",
        a: "Shipping is calculated based on volume (CBM), weight, and destination. For orders above 5,000 units, we offer free sea freight to major ports. Contact us for a detailed logistics quote.",
      },
    ],
  },
  {
    category: "Product & Warranty",
    items: [
      {
        q: "What is the warranty policy?",
        a: "All Standing Shield tumblers come with a lifetime warranty against manufacturing defects. This covers vacuum seal failure, coating defects, and lid leakage. The warranty does not cover damage from drops or misuse.",
      },
      {
        q: "Are your products food-safe certified?",
        a: "Yes, all our tumblers are FDA (U.S. Food and Drug Administration) and LFGB (German Food and Feed Code) certified. Our medical-grade 316L stainless steel inner wall is completely BPA-free and resistant to flavor transfer.",
      },
      {
        q: "How long does the insulation last?",
        a: "Our double-wall vacuum insulation is rated for 24 hours cold and 12 hours hot under standard conditions (room temperature, sealed lid). Performance may vary slightly based on ambient temperature and pre-chilling.",
      },
      {
        q: "Are the tumblers dishwasher safe?",
        a: "Yes, the stainless steel body is dishwasher safe. However, we recommend hand-washing the lid to preserve the precision seal gasket. Avoid abrasive scrubbers on the matte powder-coat finish to maintain its appearance.",
      },
    ],
  },
];

export default function FaqClient() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-28 pb-8 px-6 md:px-12 max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-orange-500 tracking-widest uppercase text-sm font-semibold mb-3">
            Support
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Frequently Asked
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Everything you need to know about our products, wholesale process, shipping, and warranty.
          </p>
        </motion.div>

        <div className="space-y-12">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-6 border-b border-white/10 pb-3">
                {section.category}
              </h2>
              <div className="space-y-3">
                {section.items.map((item, i) => {
                  const key = `${section.category}-${i}`;
                  const isOpen = openItems[key];

                  return (
                    <div
                      key={key}
                      className="bg-white/[0.02] rounded-xl border border-white/5 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                      >
                        <span className="text-white font-medium pr-4">
                          {item.q}
                        </span>
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                          {isOpen ? (
                            <Minus className="w-4 h-4 text-orange-500" />
                          ) : (
                            <Plus className="w-4 h-4 text-gray-400" />
                          )}
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 text-gray-400 leading-relaxed text-sm">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-white/[0.02] rounded-2xl border border-white/5 p-10"
        >
          <h3 className="text-xl font-serif text-white mb-3">
            Still have questions?
          </h3>
          <p className="text-gray-400 mb-6">
            Our B2B team is here to help. Reach out and we will get back to you within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors text-sm"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
