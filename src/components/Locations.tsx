"use client";

import { motion } from "framer-motion";
import { ExternalLink, MapPin, Phone } from "lucide-react";

const locations = [
  {
    id: "china",
    tag: "Base 01 · China",
    name: "Global Sourcing HQ",
    address: "Yiwu International Trade City, Zone 6, B168, Yiwu, Zhejiang, China",
    phone: "+86 153 2001 2861",
    phoneHref: "tel:+8615320012861",
    query: "Yiwu International Trade City Zone 6, Yiwu, Zhejiang, China",
    zoom: 14,
  },
  {
    id: "thailand",
    tag: "Base 02 · Thailand",
    name: "SEA Fulfillment Center",
    address: "Bangkok Free Trade Zone 7, Bang Phli Yai, Bang Phli District, Samut Prakan 10540, Thailand",
    phone: "+66 82 793 6884",
    phoneHref: "tel:+66827936884",
    query: "Bangkok Free Trade Zone, Bang Phli, Samut Prakan 10540, Thailand",
    zoom: 13,
  },
];

// Key-free Google Maps embed; pan/zoom work inside the iframe
const embedSrc = (q: string, z: number) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=${z}&hl=en&output=embed`;

// Official universal link format — opens the full Maps app/site, no key needed
const openSrc = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export default function Locations() {
  return (
    <section id="locations" className="px-6 md:px-12 max-w-7xl mx-auto pb-24 pt-8 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <p className="text-orange-500 tracking-widest uppercase text-sm font-semibold mb-3">
          Visit Us
        </p>
        <h2 className="text-2xl sm:text-4xl font-serif text-white uppercase tracking-wider mb-4">
          Find Us on the Map
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Two operational bases — our Yiwu sourcing HQ and Bangkok free-trade warehouse.
          Factory visits and showroom walk-ins welcome by appointment.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {locations.map((loc, i) => (
          <motion.div
            key={loc.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors"
          >
            {/* Zoomable embedded map — greyscale until hovered to match the theme */}
            <div className="relative h-64 sm:h-72 bg-white/5">
              <iframe
                src={embedSrc(loc.query, loc.zoom)}
                title={`Map — ${loc.name}`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full border-0 grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </div>

            <div className="p-6">
              <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-orange-500 font-semibold border border-orange-500/20 rounded-full px-3 py-1 mb-4">
                {loc.tag}
              </span>
              <h3 className="text-white font-serif text-xl mb-2">{loc.name}</h3>
              <p className="flex items-start gap-2 text-gray-400 text-sm mb-2">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                {loc.address}
              </p>
              <a
                href={loc.phoneHref}
                className="flex items-center gap-2 text-gray-400 text-sm mb-5 hover:text-white transition-colors w-fit"
              >
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                {loc.phone}
              </a>
              <a
                href={openSrc(loc.query)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/15 rounded-full text-sm text-white hover:border-orange-500/60 hover:text-orange-400 transition-colors"
              >
                Open in Google Maps
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
