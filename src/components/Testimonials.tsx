"use client";

import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import { products } from "@/data/products";

const totalReviews = products.reduce((sum, p) => sum + p.reviewCount, 0);
const avgRating = (
  products.reduce((sum, p) => sum + p.rating * p.reviewCount, 0) / totalReviews
).toFixed(1);

const testimonials = [
  {
    quote:
      "Filled it with ice at a 6am trailhead — the cubes were still rattling around when I got back to the car at sunset. The engraving hasn't scratched after a full season of being tossed in my pack.",
    name: "Sarah Mitchell",
    role: "Trail Runner · Colorado, US",
    product: "30oz · Midnight Black",
    rating: 5,
  },
  {
    quote:
      "We ordered 500 units laser-engraved with our company logo for a client summit. Flawless etching on every single one, delivered ahead of schedule. Our procurement team has already reordered.",
    name: "Marcus Chen",
    role: "Procurement Director · TechFirm APAC",
    product: "Bulk Order · Custom Engraving",
    rating: 5,
  },
  {
    quote:
      "As a barista I'm picky about how long espresso stays hot. Twelve hours in, my flat white was still properly warm. The 20oz slides into my car's cup holder like it was designed for it — because it was.",
    name: "Elena Rodriguez",
    role: "Head Barista · Madrid, ES",
    product: "20oz · Oatmeal Beige",
    rating: 5,
  },
  {
    quote:
      "Took the 40oz across 3,000km of overlanding through dust, corrugations and river crossings. A few honest scuffs on the powder coat, but the vacuum seal never gave up. Wish the handle shipped standard.",
    name: "David Keller",
    role: "Overlander · Western Australia",
    product: "40oz · Meteorite Grey",
    rating: 4,
  },
  {
    quote:
      "It sits on my desk from the first standup to the last commit. Coffee stays hot through back-to-back meetings, and the anti-slip base has saved my keyboard more than once.",
    name: "Aisha Thompson",
    role: "Software Engineer · London, UK",
    product: "30oz · Meteorite Grey",
    rating: 5,
  },
  {
    quote:
      "We stock Standing Shield across our eight outdoor retail locations. Lowest return rate of any drinkware brand we carry, and the margin structure on wholesale is genuinely fair. Restocked three times this year.",
    name: "Tom Weaver",
    role: "Retail Buyer · Summit Outfitters",
    product: "Wholesale Partner · 2 Years",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < count ? "text-orange-500 fill-orange-500" : "text-gray-700"
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="w-full bg-black py-20 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-orange-500 tracking-widest uppercase text-sm font-semibold mb-3">
            Field Reports
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-serif text-white uppercase tracking-wider mb-4">
            Carried &amp; Trusted
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            From solo trail runners to 500-unit corporate orders — what the people carrying the Shield have to say.
          </p>
        </motion.div>

        {/* Aggregate rating strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-16"
        >
          <div className="flex items-center gap-3">
            <span className="text-4xl font-serif text-white">{avgRating}</span>
            <div>
              <Stars count={5} />
              <span className="text-gray-500 text-xs mt-1 block">
                {totalReviews} verified reviews
              </span>
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/10" />
          <div className="text-center">
            <span className="text-2xl font-serif text-white block">96%</span>
            <span className="text-gray-500 text-xs">would recommend</span>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/10" />
          <div className="text-center">
            <span className="text-2xl font-serif text-white block">30+</span>
            <span className="text-gray-500 text-xs">countries served</span>
          </div>
        </motion.div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="flex flex-col bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-7 hover:border-white/10 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <Stars count={t.rating} />
                <span className="text-[10px] uppercase tracking-[0.2em] text-orange-500/70 font-mono border border-orange-500/20 rounded-full px-2.5 py-1">
                  {t.product}
                </span>
              </div>

              <blockquote className="text-gray-300 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="flex items-center gap-3 mt-6 pt-5 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500/30 to-orange-500/5 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-400 font-serif text-sm">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white text-sm font-medium truncate">{t.name}</span>
                    <BadgeCheck className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                  </div>
                  <span className="text-gray-500 text-xs truncate block">{t.role}</span>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
