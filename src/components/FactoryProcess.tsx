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
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  // Mobile optimization: Swipe horizontally to scroll the page vertically
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    (containerRef as any).current._startX = touch.clientX;
    (containerRef as any).current._startY = window.scrollY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!(containerRef.current as any)._startX) return;
    const touch = e.touches[0];
    const deltaX = (containerRef.current as any)._startX - touch.clientX;
    
    // If swiping horizontally, scroll the window vertically to drive the animation
    if (Math.abs(deltaX) > 10) {
      window.scrollTo(0, (containerRef.current as any)._startY + deltaX * 2);
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative h-[300vh] md:h-[500vh] bg-black"
      style={{ position: "relative" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-start overflow-hidden">
        
        {/* Header Title */}
        <div className="absolute top-20 sm:top-24 left-4 sm:left-6 md:left-24 z-10 mix-blend-difference">
          <p className="text-orange-500 uppercase tracking-widest text-xs sm:text-sm font-semibold mb-2">Behind The Shield</p>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-serif text-white uppercase tracking-wider">The Making Of</h2>
        </div>

        {/* Horizontal Scrolling Track */}
        <motion.div 
          style={{ 
            x, 
            touchAction: "pan-y",
            willChange: "transform" // GPU Acceleration
          }} 
          className="flex w-[500%] h-[60vh] md:h-[70vh] items-center mt-32 relative z-0"
        >
          {processes.map((process) => (
            <div key={process.id} className="w-[20%] h-full flex items-center justify-center px-2 sm:px-6 md:px-24 flex-shrink-0">
              <div className="relative w-full h-full max-w-5xl group overflow-hidden brightness-75 hover:brightness-100 transition-all duration-700 rounded-lg">
                <img 
                  src={process.image} 
                  alt={process.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                />
                
                {/* Overlay Text */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 bg-gradient-to-t from-black/90 to-transparent">
                  <h3 className="text-lg sm:text-3xl font-serif text-white mb-1 sm:mb-2">{process.title}</h3>
                  <p className="text-gray-300 text-xs sm:text-base max-w-md">{process.description}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Progress Bar (Bottom) */}
        <div className="absolute bottom-8 sm:bottom-12 left-6 right-6 sm:left-24 sm:right-24 h-1 bg-white/10 rounded-full overflow-hidden mix-blend-difference">
            <motion.div 
                className="h-full bg-orange-500 origin-left"
                style={{ scaleX: scrollYProgress }}
            />
        </div>
      </div>
    </section>
  );
}
