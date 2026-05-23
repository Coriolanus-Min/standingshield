"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function TechBreakdown() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cupRef = useRef<HTMLDivElement>(null);
  
  const [mobileSection, setMobileSection] = useState(0);
  const [coords, setCoords] = useState<{
    centerX: number;
    centerY: number;
    xOffset: number;
    cupHeight: number;
  } | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const shouldReduceMotion = useReducedMotion();
  const slideOffset = shouldReduceMotion ? 0 : 30;

  const cupScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8]);
  
  // Non-overlapping scroll intervals with a clean gap to prevent simultaneous visibility
  const lidOpacity = useTransform(scrollYProgress, [0.05, 0.10, 0.20, 0.25], [0, 1, 1, 0]);
  const lidX = useTransform(scrollYProgress, [0.05, 0.10, 0.20, 0.25], [slideOffset, 0, 0, slideOffset]);

  const vacuumOpacity = useTransform(scrollYProgress, [0.28, 0.33, 0.43, 0.48], [0, 1, 1, 0]);
  const vacuumX = useTransform(scrollYProgress, [0.28, 0.33, 0.43, 0.48], [-slideOffset, 0, 0, -slideOffset]);

  const innerOpacity = useTransform(scrollYProgress, [0.51, 0.56, 0.66, 0.71], [0, 1, 1, 0]);
  const innerX = useTransform(scrollYProgress, [0.51, 0.56, 0.66, 0.71], [slideOffset, 0, 0, slideOffset]);

  const baseOpacity = useTransform(scrollYProgress, [0.74, 0.79, 0.89, 0.94], [0, 1, 1, 0]);
  const baseX = useTransform(scrollYProgress, [0.74, 0.79, 0.89, 0.94], [-slideOffset, 0, 0, -slideOffset]);

  // Mobile container overall visibility
  const mobileContainerOpacity = useTransform(scrollYProgress, [0.02, 0.05, 0.94, 0.97], [0, 1, 1, 0]);

  // Calculate layout coordinates on mount & resize
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateCoords = () => {
      if (!wrapperRef.current || !cupRef.current) return;
      const parentWidth = wrapperRef.current.offsetWidth;
      const parentHeight = wrapperRef.current.offsetHeight;
      const cupWidth = cupRef.current.offsetWidth;
      const cupHeight = cupRef.current.offsetHeight;

      const centerX = parentWidth / 2;
      const centerY = parentHeight / 2;

      // Adjust gap based on screen size to prevent overflow
      const gap = window.innerWidth >= 1024 ? 60 : 30;
      const xOffset = cupWidth / 2 + gap;

      setCoords({
        centerX,
        centerY,
        xOffset,
        cupHeight,
      });
    };

    updateCoords();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        updateCoords();
      });
      if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);
      if (cupRef.current) resizeObserver.observe(cupRef.current);
    }

    window.addEventListener("resize", updateCoords);

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener("resize", updateCoords);
    };
  }, []);

  // Update mobile active section index discretely (stabilized)
  useEffect(() => {
    return scrollYProgress.onChange((value) => {
      let nextSection = 0;
      if (value < 0.265) nextSection = 0;
      else if (value < 0.495) nextSection = 1;
      else if (value < 0.725) nextSection = 2;
      else nextSection = 3;

      setMobileSection((prev) => (prev !== nextSection ? nextSection : prev));
    });
  }, [scrollYProgress]);

  const mobileItems = [
    { title: "Damped Lid", description: "Precision seal, damped hinge, toss it in a bag with confidence." },
    { title: "Vacuum Insulation", description: "Keeps drinks cold 24h and hot 12h with a copper-backed vacuum wall." },
    { title: "316L Stainless", description: "Pure taste and corrosion resistance from food-grade stainless steel." },
    { title: "Anti-Slip Base", description: "Stable on any surface with an anti-skid silicone base that stays put." },
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative h-[250vh] md:h-[400vh] bg-black pt-24 md:pt-32"
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
        <div ref={wrapperRef} className="relative w-full max-w-7xl h-full flex items-center justify-center">
            
            {/* 1. Lid - Dynamically Positioned */}
            <motion.div 
                style={{ 
                  opacity: coords ? lidOpacity : 0, 
                  x: lidX,
                  y: "-50%",
                  left: coords ? `${coords.centerX + coords.xOffset}px` : undefined,
                  top: coords ? `${coords.centerY - coords.cupHeight * 0.28}px` : undefined,
                }}
                className="absolute max-w-[280px] text-left z-40 hidden md:block"
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

            {/* 2. Vacuum - Dynamically Positioned */}
            <motion.div 
                style={{ 
                  opacity: coords ? vacuumOpacity : 0, 
                  x: vacuumX,
                  y: "-50%",
                  right: coords ? `${coords.centerX + coords.xOffset}px` : undefined,
                  top: coords ? `${coords.centerY - coords.cupHeight * 0.08}px` : undefined,
                }}
                className="absolute max-w-[280px] text-right z-40 hidden md:block"
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

            {/* 3. Inner Wall - Dynamically Positioned */}
            <motion.div 
                style={{ 
                  opacity: coords ? innerOpacity : 0, 
                  x: innerX,
                  y: "-50%",
                  left: coords ? `${coords.centerX + coords.xOffset}px` : undefined,
                  top: coords ? `${coords.centerY + coords.cupHeight * 0.12}px` : undefined,
                }}
                className="absolute max-w-[280px] text-left z-40 hidden md:block"
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

            {/* 4. Base - Dynamically Positioned */}
            <motion.div 
                style={{ 
                  opacity: coords ? baseOpacity : 0, 
                  x: baseX,
                  y: "-50%",
                  right: coords ? `${coords.centerX + coords.xOffset}px` : undefined,
                  top: coords ? `${coords.centerY + coords.cupHeight * 0.32}px` : undefined,
                }}
                className="absolute max-w-[280px] text-right z-40 hidden md:block"
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
                ref={cupRef}
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

        {/* Mobile View - Floating Bottom Card */}
        <motion.div 
          style={{ opacity: mobileContainerOpacity }}
          className="md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 w-[90vw] max-w-[400px] z-50 pointer-events-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileSection}
              initial={{ 
                opacity: 0, 
                y: shouldReduceMotion ? 0 : 10 
              }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ 
                opacity: 0, 
                y: shouldReduceMotion ? 0 : -10 
              }}
              transition={{ duration: shouldReduceMotion ? 0.1 : 0.25 }}
              className="bg-neutral-950/70 backdrop-blur-md border border-neutral-800/80 rounded-2xl px-5 py-4 shadow-xl"
            >
              <span className="block text-xs uppercase tracking-[0.25em] text-orange-500 font-bold mb-1.5">
                {mobileItems[mobileSection].title}
              </span>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                {mobileItems[mobileSection].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
