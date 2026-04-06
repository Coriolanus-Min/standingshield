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
    offset: ["start start", "end end"]
  });
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(processes.length - 1) * 100}vw`]);

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-start overflow-hidden">
        
        {/* Header Title */}
        <div className="absolute top-24 left-6 md:left-24 z-10 mix-blend-difference">
          <p className="text-orange-500 uppercase tracking-widest text-sm font-semibold mb-2">Behind The Shield</p>
          <h2 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-wider">The Making Of</h2>
        </div>

        {/* Horizontal Scrolling Track */}
        <motion.div 
          style={{ x, touchAction: "pan-y" }} 
          className="flex w-[500vw] h-[60vh] md:h-[70vh] items-center mt-32 relative z-0"
        >
          {processes.map((process) => (
            <div key={process.id} className="w-[100vw] h-full flex items-center justify-center px-6 md:px-24 flex-shrink-0">
              <div className="relative w-full h-full max-w-5xl group overflow-hidden brightness-75 hover:brightness-100 transition-all duration-700 rounded-lg">
                <img 
                  src={process.image} 
                  alt={process.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                />
                
                {/* Overlay Text */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                  <h3 className="text-3xl font-serif text-white mb-2">{process.title}</h3>
                  <p className="text-gray-300 max-w-md">{process.description}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Progress Bar (Bottom) */}
        <div className="absolute bottom-12 left-24 right-24 h-px bg-white/20 hidden md:block">
            <motion.div 
                className="h-full bg-orange-500 origin-left"
                style={{ scaleX: scrollYProgress }}
            />
        </div>
      </div>
    </section>
  );
}
