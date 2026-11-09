"use client";

import { useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    id: "active",
    image: "/images/standing_shield_active_life.png",
    subtitle: "Active Life",
    title: "Stand Firm,\nStay Cool.",
    description:
      "Your Standing Shield tumbler, laser-engraved with our signature camel rider, standing by your side at the gym.",
    categoryHint: "Sport Bottle",
  },
  {
    id: "outdoor",
    image: "/images/standing_shield_outdoor_escape.png",
    subtitle: "Outdoor Escape",
    title: "Built for\nthe Wild.",
    description:
      "Rugged durability with a refined laser-engraved finish. Your all-scene shield for any adventure.",
    categoryHint: "Classic Tumbler",
  },
  {
    id: "urban",
    image: "/images/standing_shield_urban_rush.png",
    subtitle: "Urban Rush",
    title: "Shield Your\nMorning.",
    description:
      "Sleek, minimalist matte design featuring our coin-scale camel emblem for your daily commute.",
    categoryHint: "Transit Bottle",
  },
  {
    id: "deep_work",
    image: "/images/standing_shield_deep_work.png",
    subtitle: "Deep Work",
    title: "Focus.\nWe Guard the Rest.",
    description:
      "Keep your coffee hot and your focus sharp with our precision-engineered vessels on your desk.",
    categoryHint: "Coffee Cup",
  },
  {
    id: "road_trip",
    image: "/images/scene_road_trip.png",
    subtitle: "Road Trip",
    title: "Shield Your\nJourney.",
    description:
      "Tapered to fit your car cup holder effortlessly. Travel in style with our signature laser-etched mark.",
    categoryHint: "Retro Bottle",
  },
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative h-screen w-full max-w-[100vw] bg-black overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Background Image with Parallax & Overlay */}
            <div className="absolute inset-0">
              <motion.img
                src={slide.image}
                alt={slide.title}
                className="object-cover w-full h-full"
                initial={{ scale: 1.1 }}
                animate={{ scale: activeIndex === index ? 1 : 1.1 }}
                transition={{ duration: 6, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end pb-24 sm:pb-32 px-4 sm:px-6 md:px-24">
              <AnimatePresence mode="wait">
                {activeIndex === index && (
                  <motion.div
                    key={`text-${slide.id}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    className="max-w-2xl text-white"
                  >
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="text-orange-500 uppercase tracking-widest font-semibold text-sm mb-4"
                    >
                      {slide.subtitle}
                    </motion.p>

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight mb-4 sm:mb-6 whitespace-pre-line font-serif"
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1 }}
                      className="text-gray-300 text-base sm:text-lg md:text-xl font-light mb-6 sm:mb-8 max-w-md"
                    >
                      {slide.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.1 }}
                      className="flex flex-wrap items-center gap-3 sm:gap-4"
                    >
                      <Link
                        href="/products"
                        className="inline-flex items-center gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 bg-white text-black font-medium tracking-wide rounded-full hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all text-sm sm:text-base shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                      >
                        Explore Collection
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <a
                        href="#products"
                        className="inline-flex items-center gap-2 px-5 py-3.5 sm:px-6 sm:py-4 bg-black/40 backdrop-blur-md border border-white/25 text-white font-medium tracking-wide rounded-full hover:bg-white/10 hover:border-white/40 transition-all text-sm sm:text-base"
                      >
                        Featured Picks
                        <ArrowDown className="w-4 h-4 text-orange-400" />
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
