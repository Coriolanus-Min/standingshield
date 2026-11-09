"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const scenes = [
  {
    src: "/images/products/style3_coffee_lifestyle.png",
    title: "Boutique Café Carry",
    tag: "300mL Pocket Coffee Cup",
    href: "/products/pocket-strap-coffee-tumbler-300ml",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/images/products/style2_transit_lifestyle.png",
    title: "Urban Commute",
    tag: "16oz AeroLight Transit",
    href: "/products/aerolight-transit-bottle-16oz",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/products/style1_pet_lifestyle.png",
    title: "Afternoon Patisserie",
    tag: "480mL Ceramic Pet Series",
    href: "/products/cute-pet-ceramic-bottle-480ml",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/products/style5_sport_lifestyle_lineup.png",
    title: "Pilates & Wellness Studio",
    tag: "650mL Ombre & Fluted Sport",
    href: "/products/ombre-fluted-sport-bottle-650ml",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    src: "/images/products/style4_retro_lifestyle.png",
    title: "Milanese Espresso Bar",
    tag: "500mL Retro Chrome-Cap",
    href: "/products/retro-chrome-cap-bottle-500ml",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    src: "/images/lifestyle_mountain.png",
    title: "Nordic Cabin Sunrise",
    tag: "20oz Classic Shield Tumbler",
    href: "/products/classic-tapered-shield-tumbler-20oz",
    span: "md:col-span-2 md:row-span-1",
  },
];

export default function LifestyleGallery() {
  return (
    <section className="w-full max-w-[100vw] overflow-x-clip bg-black py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-orange-500 tracking-widest uppercase text-sm font-semibold mb-3">
            In the Wild
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-serif text-white uppercase tracking-wider mb-4">
            One Shield, Every Scene
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Six distinct silhouettes crafted for every ritual — from morning espresso walks and Pilates studios to Nordic cabin overlooks.
          </p>
        </motion.div>

        {/* Symmetric 4x3 Bento Mosaic Grid (12 cells total, zero empty gaps) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[240px] md:auto-rows-[270px] gap-4">
          {scenes.map((scene, i) => (
            <motion.div
              key={scene.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`group relative rounded-2xl overflow-hidden border border-white/10 ${scene.span}`}
            >
              <Link href={scene.href} className="block w-full h-full relative">
                <img
                  src={scene.src}
                  alt={scene.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-4 h-4 text-orange-400" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-orange-400 font-semibold block">
                    {scene.tag}
                  </span>
                  <h3 className="text-white font-serif text-lg sm:text-xl mt-1 group-hover:text-orange-200 transition-colors">
                    {scene.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
