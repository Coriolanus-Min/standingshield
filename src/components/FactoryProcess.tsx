"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const processes = [
  {
    id: "coating",
    title: "01. Precision Coating",
    description: "Premium matte finish applied in a state-of-the-art dust-free booth.",
    image: "/images/factory_coating.png",
  },
  {
    id: "assembly",
    title: "02. Cleanroom Assembly",
    description: "Meticulous assembly process ensuring the vacuum seal integrity.",
    image: "/images/factory_assembly.png",
  },
  {
    id: "laser",
    title: "03. Signature Laser Engraving",
    description: "High-precision blue laser etching our iconic camel rider logo.",
    image: "/images/factory_laser.png",
  },
  {
    id: "qc",
    title: "04. Rigorous QC",
    description: "Robotic durability and thermal retention testing.",
    image: "/images/factory_qc.png",
  },
  {
    id: "shipping",
    title: "05. Global Dispatch",
    description: "Palletized and loaded into containers, ready to shield you worldwide.",
    image: "/images/factory_shipping.png",
  },
];

export default function FactoryProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <div className="w-full max-w-[100vw] overflow-x-clip bg-black">
      {/* MOBILE NATIVE HORIZONTAL SNAP GALLERY (< md): Zero 300vh blank space, zero 500% overflow */}
      <section className="md:hidden py-20 bg-black">
        <div className="px-4 sm:px-6 mb-8">
          <p className="text-orange-500 uppercase tracking-widest text-xs font-semibold mb-2">
            Behind The Shield
          </p>
          <h2 className="text-2xl sm:text-4xl font-serif text-white uppercase tracking-wider">
            The Making Of
          </h2>
          <p className="text-gray-500 text-xs mt-2">
            Swipe horizontally to explore our 5-stage precision production line →
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 pb-4 no-scrollbar">
          {processes.map((process) => (
            <div
              key={process.id}
              className="snap-center flex-shrink-0 w-[85vw] max-w-[360px] aspect-[4/3] relative rounded-2xl overflow-hidden border border-white/10"
            >
              <img
                src={process.image}
                alt={process.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-lg font-serif text-white mb-1">{process.title}</h3>
                <p className="text-gray-300 text-xs leading-relaxed">{process.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DESKTOP STICKY SCROLL LAYOUT (md and up) */}
      <section
        ref={containerRef}
        className="hidden md:block relative h-[500vh] bg-black"
      >
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-start overflow-hidden">
          <div className="absolute top-24 left-12 lg:left-24 z-10 mix-blend-difference">
            <p className="text-orange-500 uppercase tracking-widest text-sm font-semibold mb-2">
              Behind The Shield
            </p>
            <h2 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-wider">
              The Making Of
            </h2>
          </div>

          <div className="w-full overflow-hidden mt-32">
            <motion.div
              style={{
                x,
                willChange: "transform",
              }}
              className="flex w-[500%] h-[70vh] items-center relative z-0"
            >
              {processes.map((process) => (
                <div
                  key={process.id}
                  className="w-[20%] h-full flex items-center justify-center px-12 lg:px-24 flex-shrink-0"
                >
                  <div className="relative w-full h-full max-w-5xl group overflow-hidden brightness-75 hover:brightness-100 transition-all duration-700 rounded-lg">
                    <img
                      src={process.image}
                      alt={process.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                      <h3 className="text-3xl font-serif text-white mb-2">{process.title}</h3>
                      <p className="text-gray-300 text-base max-w-md">{process.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="absolute bottom-12 left-24 right-24 h-1 bg-white/10 rounded-full overflow-hidden mix-blend-difference">
            <motion.div
              className="h-full bg-orange-500 origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
