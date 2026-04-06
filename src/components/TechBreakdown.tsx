"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function TechBreakdown() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress through this section (0 to 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animations based on scroll progress
  // Title fades out as we scroll down
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);

  // Cup scales up slightly and stays fixed
  const cupScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);
  
  // Feature 1: Leak-Proof Lid (Top Right)
  const lidOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.4, 0.5], [0, 1, 1, 0]);
  const lidX = useTransform(scrollYProgress, [0.1, 0.2, 0.4, 0.5], [50, 0, 0, 50]);

  // Feature 2: Vacuum Insulation (Mid Left)
  const vacuumOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const vacuumX = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [-50, 0, 0, -50]);

  // Feature 3: Medical Grade Inner (Mid Right)
  const innerOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0]);
  const innerX = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [50, 0, 0, 50]);

  // Feature 4: Anti-Slip Base (Bottom Left)
  const baseOpacity = useTransform(scrollYProgress, [0.7, 0.8, 0.95, 1], [0, 1, 1, 0]);
  const baseX = useTransform(scrollYProgress, [0.7, 0.8, 0.95, 1], [-50, 0, 0, -50]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#0a0a0a]">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Section Title */}
        <motion.div 
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute top-24 left-0 right-0 text-center z-20"
        >
          <p className="text-orange-500 tracking-widest uppercase text-sm font-semibold mb-2">The Anatomy</p>
          <h2 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-wider">The Shield Tech</h2>
        </motion.div>

        {/* Central Tumbler Image */}
        <motion.div 
          style={{ scale: cupScale }}
          className="relative w-full max-w-sm md:max-w-md h-[70vh] z-10 flex justify-center items-center"
        >
          {/* Using mix-blend-lighten to remove black background from generated image if any */}
          <img 
            src="/images/tech_tumbler.png" 
            alt="Standing Shield Anatomy" 
            className="object-contain h-full mix-blend-lighten drop-shadow-2xl"
          />
        </motion.div>

        {/* --- Anatomy Pointers --- */}

        {/* 1. Lid */}
        <motion.div 
          style={{ opacity: lidOpacity, x: lidX }}
          className="absolute top-1/4 right-[10%] md:right-[20%] max-w-[200px] text-left z-20 hidden md:block"
        >
          <div className="h-px w-24 bg-orange-500 absolute -left-28 top-3" />
          <h3 className="text-xl text-white font-bold mb-2 uppercase">Damped Leak-Proof Lid</h3>
          <p className="text-gray-400 text-sm">Engineered precision seal. Toss it in your bag with zero hesitation.</p>
        </motion.div>

        {/* 2. Vacuum */}
        <motion.div 
          style={{ opacity: vacuumOpacity, x: vacuumX }}
          className="absolute top-[40%] left-[10%] md:left-[20%] max-w-[200px] text-right z-20 hidden md:block"
        >
          <div className="h-px w-24 bg-orange-500 absolute -right-28 top-3" />
          <h3 className="text-xl text-white font-bold mb-2 uppercase">Double-Wall Vacuum</h3>
          <p className="text-gray-400 text-sm">Advanced thermal lockdown. 24h cold, 12h piping hot.</p>
        </motion.div>

        {/* 3. Inner Wall */}
        <motion.div 
          style={{ opacity: innerOpacity, x: innerX }}
          className="absolute top-[60%] right-[10%] md:right-[20%] max-w-[200px] text-left z-20 hidden md:block"
        >
          <div className="h-px w-24 bg-gray-500 absolute -left-28 top-3" />
          <h3 className="text-xl text-white font-bold mb-2 uppercase">Med-Grade 316L</h3>
          <p className="text-gray-400 text-sm">Resists corrosion and flavor transfer. Pure taste, always.</p>
        </motion.div>

        {/* 4. Base */}
        <motion.div 
          style={{ opacity: baseOpacity, x: baseX }}
          className="absolute bottom-[20%] left-[10%] md:left-[20%] max-w-[200px] text-right z-20 hidden md:block"
        >
          <div className="h-[2px] w-24 bg-orange-500 absolute -right-28 top-3" />
          <h3 className="text-xl text-white font-bold mb-2 uppercase">Anti-Slip Silicone Base</h3>
          <p className="text-gray-400 text-sm">Stands firm on any surface. Silent landing, zero sliding.</p>
        </motion.div>

        {/* Mobile View (simplified) */}
        <div className="md:hidden absolute bottom-12 left-6 right-6 z-20 text-center">
            <motion.div style={{ opacity: lidOpacity, position: 'absolute', width: '100%', top: 0 }}>
                <h3 className="text-lg text-white font-bold uppercase text-orange-400">Damped Lid</h3>
                <p className="text-gray-300 text-sm">Engineered precision seal.</p>
            </motion.div>
            <motion.div style={{ opacity: vacuumOpacity, position: 'absolute', width: '100%', top: 0 }}>
                <h3 className="text-lg text-white font-bold uppercase text-orange-400">Vacuum Insulation</h3>
                <p className="text-gray-300 text-sm">24h cold, 12h piping hot.</p>
            </motion.div>
            <motion.div style={{ opacity: innerOpacity, position: 'absolute', width: '100%', top: 0 }}>
                <h3 className="text-lg text-white font-bold uppercase text-orange-400">316L Stainless</h3>
                <p className="text-gray-300 text-sm">Pure taste, resists corrosion.</p>
            </motion.div>
            <motion.div style={{ opacity: baseOpacity, position: 'absolute', width: '100%', top: 0 }}>
                <h3 className="text-lg text-white font-bold uppercase text-orange-400">Anti-Slip Base</h3>
                <p className="text-gray-300 text-sm">Stands firm on any surface.</p>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
