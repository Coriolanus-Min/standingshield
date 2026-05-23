"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function TechBreakdown() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const cupScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8]);
  
  // Compact Timeline for better engagement (No overlap)
  const lidOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.3, 0.4], [0, 1, 1, 0]);
  const lidX = useTransform(scrollYProgress, [0.05, 0.15, 0.3, 0.4], [30, 0, 0, 30]);

  const vacuumOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.5, 0.6], [0, 1, 1, 0]);
  const vacuumX = useTransform(scrollYProgress, [0.25, 0.35, 0.5, 0.6], [-30, 0, 0, -30]);

  const innerOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.8], [0, 1, 1, 0]);
  const innerX = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.8], [30, 0, 0, 30]);

  const baseOpacity = useTransform(scrollYProgress, [0.65, 0.75, 0.9, 1], [0, 1, 1, 0]);
  const baseX = useTransform(scrollYProgress, [0.65, 0.75, 0.9, 1], [-30, 0, 0, -30]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[250vh] md:h-[400vh] bg-black pt-24 md:pt-32"
      style={{ position: "relative" }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Title - Consistent with ProductsGrid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="absolute top-0 left-0 right-0 text-center z-50 pointer-events-none"
        >
          <p className="text-orange-500 tracking-widest uppercase text-xs sm:text-sm font-semibold mb-2 sm:mb-3">The Anatomy</p>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-serif text-white font-bold uppercase tracking-wider">The Shield Tech</h2>
        </motion.div>

        {/* Layout Wrapper with calculated offsets */}
        <div className="relative w-full max-w-7xl h-full flex items-center justify-center">
            
            {/* 1. Lid - Fixed Right Offset */}
            <motion.div 
                style={{ opacity: lidOpacity, x: lidX }}
                className="absolute left-[calc(50%+160px)] lg:left-[calc(50%+220px)] top-[22%] max-w-[280px] text-left z-40 hidden md:block"
            >
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] border border-orange-500/50 text-orange-500 px-1 font-mono">T-01</span>
                    <h3 className="text-xl text-white font-bold uppercase tracking-tight">Damped Leak-Proof Lid</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">Engineered precision seal. Toss it in your bag with zero hesitation.</p>
                <ul className="text-[10px] text-orange-500/60 font-mono space-y-1 border-l border-orange-500/20 pl-3 uppercase tracking-wider">
                    <li>&gt; 1.2BAR PRESSURE</li>
                    <li>&gt; DAMPED HINGE</li>
                    <li>&gt; BPA-FREE TRITAN</li>
                </ul>
            </motion.div>

            {/* 2. Vacuum - Fixed Left Offset */}
            <motion.div 
                style={{ opacity: vacuumOpacity, x: vacuumX }}
                className="absolute right-[calc(50%+160px)] lg:right-[calc(50%+220px)] top-[38%] max-w-[280px] text-right z-40 hidden md:block"
            >
                <div className="flex items-center gap-2 mb-2 justify-end">
                    <h3 className="text-xl text-white font-bold uppercase tracking-tight">Double-Wall Vacuum</h3>
                    <span className="text-[9px] border border-orange-500/50 text-orange-500 px-1 font-mono">T-02</span>
                </div>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">Advanced thermal lockdown. 24h cold, 12h piping hot.</p>
                <ul className="text-[10px] text-orange-500/60 font-mono space-y-1 border-r border-orange-500/20 pr-3 uppercase tracking-wider">
                    <li>&gt; 0.001PA VACUUM</li>
                    <li>&gt; COPPER LAYER</li>
                    <li>&gt; GETTER MATERIAL</li>
                </ul>
            </motion.div>

            {/* 3. Inner Wall - Fixed Right Offset (T-03) */}
            <motion.div 
                style={{ opacity: innerOpacity, x: innerX }}
                className="absolute left-[calc(50%+160px)] lg:left-[calc(50%+220px)] top-[58%] max-w-[280px] text-left z-40 hidden md:block"
            >
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] border border-orange-500/50 text-orange-500 px-1 font-mono">T-03</span>
                    <h3 className="text-xl text-white font-bold uppercase tracking-tight">Med-Grade 316L</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">Resists corrosion and flavor transfer. Pure taste, always.</p>
                <ul className="text-[10px] text-orange-500/60 font-mono space-y-1 border-l border-orange-500/20 pl-3 uppercase tracking-wider">
                    <li>&gt; 316L REINFORCED</li>
                    <li>&gt; ELECTRO-POLISHED</li>
                    <li>&gt; ION-NEUTRAL</li>
                </ul>
            </motion.div>

            {/* 4. Base - Fixed Left Offset */}
            <motion.div 
                style={{ opacity: baseOpacity, x: baseX }}
                className="absolute right-[calc(50%+160px)] lg:right-[calc(50%+220px)] bottom-[12%] max-w-[280px] text-right z-40 hidden md:block"
            >
                <div className="flex items-center gap-2 mb-2 justify-end">
                    <h3 className="text-xl text-white font-bold uppercase tracking-tight">Anti-Slip Silicone</h3>
                    <span className="text-[9px] border border-orange-500/50 text-orange-500 px-1 font-mono">T-04</span>
                </div>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">Stands firm on any surface. Silent landing, zero sliding.</p>
                <ul className="text-[10px] text-orange-500/60 font-mono space-y-1 border-r border-orange-500/20 pr-3 uppercase tracking-wider">
                    <li>&gt; 85 SHORE-A</li>
                    <li>&gt; IMPACT-RESISTANT</li>
                    <li>&gt; MODULAR BASE</li>
                </ul>
            </motion.div>

            {/* Central Tumbler Image - Clean z-indexed position */}
            <motion.div 
                style={{ scale: cupScale }}
                className="w-full max-w-sm md:max-w-md h-[55vh] z-10 flex justify-center items-center pointer-events-none"
            >
                <img 
                    src="/images/tech_tumbler.png" 
                    alt="Standing Shield Anatomy" 
                    className="object-contain h-full mix-blend-lighten drop-shadow-2xl"
                />
            </motion.div>

        </div>

        {/* Mobile View */}
        <div className="md:hidden absolute bottom-8 left-4 right-4 z-20 text-center h-16">
            <motion.div style={{ opacity: lidOpacity }} className="absolute inset-0 flex flex-col items-center justify-center">
                <h3 className="text-base text-orange-400 font-bold uppercase">Damped Lid</h3>
                <p className="text-gray-300 text-xs mt-1">Engineered precision seal. 1.2 BAR pressure.</p>
            </motion.div>
            <motion.div style={{ opacity: vacuumOpacity }} className="absolute inset-0 flex flex-col items-center justify-center">
                <h3 className="text-base text-orange-400 font-bold uppercase">Vacuum Insulation</h3>
                <p className="text-gray-300 text-xs mt-1">24h cold, 12h piping hot. Copper layer.</p>
            </motion.div>
            <motion.div style={{ opacity: innerOpacity }} className="absolute inset-0 flex flex-col items-center justify-center">
                <h3 className="text-base text-orange-400 font-bold uppercase">316L Stainless</h3>
                <p className="text-gray-300 text-xs mt-1">Pure taste, resists corrosion. Ion-neutral.</p>
            </motion.div>
            <motion.div style={{ opacity: baseOpacity }} className="absolute inset-0 flex flex-col items-center justify-center">
                <h3 className="text-base text-orange-400 font-bold uppercase">Anti-Slip Base</h3>
                <p className="text-gray-300 text-xs mt-1">Stands firm on any surface. 85 Shore-A.</p>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
