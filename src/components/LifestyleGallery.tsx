"use client";

import { motion } from "framer-motion";

const scenes = [
  {
    src: "/images/lifestyle_mountain.png",
    title: "Summit Sunrise",
    tag: "Outdoor Escape",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/images/lifestyle_office.png",
    title: "Deep Work",
    tag: "Desk Companion",
    span: "",
  },
  {
    src: "/images/lifestyle_car.png",
    title: "Road Trip",
    tag: "Cup-Holder Fit",
    span: "",
  },
  {
    src: "/images/lifestyle_picnic.png",
    title: "Park Picnic",
    tag: "Active Life",
    span: "",
  },
  {
    src: "/images/lifestyle_night.png",
    title: "Night Stand",
    tag: "Home Comfort",
    span: "",
  },
  {
    src: "/images/lifestyle_autumn.png",
    title: "Autumn Trail",
    tag: "All-Season",
    span: "md:col-span-2",
  },
];

export default function LifestyleGallery() {
  return (
    <section className="w-full bg-black py-20 md:py-32">
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
            From summit sunrises to late-night desks — the Shield fits every hour of your day.
          </p>
        </motion.div>

        {/* Mosaic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[220px] md:auto-rows-[260px] gap-4">
          {scenes.map((scene, i) => (
            <motion.div
              key={scene.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`group relative rounded-2xl overflow-hidden border border-white/5 ${scene.span}`}
            >
              <img
                src={scene.src}
                alt={scene.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="text-[10px] uppercase tracking-[0.25em] text-orange-500 font-semibold">
                  {scene.tag}
                </span>
                <h3 className="text-white font-serif text-lg mt-1">{scene.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
