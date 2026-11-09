"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const mobileItems = [
  {
    code: "T-01",
    title: "Damped Leak-Proof Lid",
    description: "Engineered precision seal and damped hinge. Toss it in your bag with zero hesitation.",
    specs: ["1.2BAR PRESSURE", "DAMPED HINGE", "BPA-FREE TRITAN"],
  },
  {
    code: "T-02",
    title: "Double-Wall Vacuum",
    description: "Advanced copper-lined thermal lockdown keeps drinks ice-cold 24h and piping hot 12h.",
    specs: ["0.001PA VACUUM", "COPPER LAYER", "GETTER MATERIAL"],
  },
  {
    code: "T-03",
    title: "Med-Grade 316L & Ceramic",
    description: "Resists corrosion, acids, and flavor transfer for pure taste in every sip.",
    specs: ["316L REINFORCED", "ELECTRO-POLISHED", "ION-NEUTRAL"],
  },
  {
    code: "T-04",
    title: "Anti-Slip Cushioned Base",
    description: "Stands firm on any surface with silent landing and impact-resistant rim protection.",
    specs: ["85 SHORE-A", "IMPACT-RESISTANT", "MODULAR BASE"],
  },
];

export default function TechBreakdown() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cupRef = useRef<HTMLDivElement>(null);

  const [coords, setCoords] = useState<{
    centerX: number;
    centerY: number;
    xOffset: number;
    cupHeight: number;
  } | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const shouldReduceMotion = useReducedMotion();
  const slideOffset = shouldReduceMotion ? 0 : 30;

  const cupScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.85, 1, 1, 0.85]);

  const lidOpacity = useTransform(scrollYProgress, [0.05, 0.1, 0.2, 0.25], [0, 1, 1, 0]);
  const lidX = useTransform(scrollYProgress, [0.05, 0.1, 0.2, 0.25], [slideOffset, 0, 0, slideOffset]);

  const vacuumOpacity = useTransform(scrollYProgress, [0.28, 0.33, 0.43, 0.48], [0, 1, 1, 0]);
  const vacuumX = useTransform(scrollYProgress, [0.28, 0.33, 0.43, 0.48], [-slideOffset, 0, 0, -slideOffset]);

  const innerOpacity = useTransform(scrollYProgress, [0.51, 0.56, 0.66, 0.71], [0, 1, 1, 0]);
  const innerX = useTransform(scrollYProgress, [0.51, 0.56, 0.66, 0.71], [slideOffset, 0, 0, slideOffset]);

  const baseOpacity = useTransform(scrollYProgress, [0.74, 0.79, 0.89, 0.94], [0, 1, 1, 0]);
  const baseX = useTransform(scrollYProgress, [0.74, 0.79, 0.89, 0.94], [-slideOffset, 0, 0, -slideOffset]);

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

  return (
    <div className="w-full max-w-[100vw] overflow-x-clip bg-black">
      {/* MOBILE NATIVE LAYOUT (< md): Zero 250vh blank scroll spacer, crisp iPhone adaptation */}
      <section className="md:hidden py-20 px-4 sm:px-6 bg-black">
        <div className="text-center mb-10">
          <p className="text-orange-500 tracking-widest uppercase text-xs font-semibold mb-2">
            The Anatomy
          </p>
          <h2 className="text-2xl sm:text-4xl font-serif text-white font-bold uppercase tracking-wider">
            The Shield Tech
          </h2>
        </div>

        <div className="flex justify-center items-center h-[320px] sm:h-[380px] mb-10">
          <img
            src="/images/tech_tumbler.png"
            alt="Standing Shield Anatomy"
            className="object-contain h-full max-w-full mix-blend-lighten drop-shadow-2xl"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
          {mobileItems.map((item) => (
            <div
              key={item.code}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] border border-orange-500/50 text-orange-500 px-1.5 py-0.5 font-mono rounded">
                  {item.code}
                </span>
                <h3 className="text-base text-white font-bold uppercase tracking-tight">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mb-3">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.specs.map((spec) => (
                  <span
                    key={spec}
                    className="text-[10px] text-orange-400/80 font-mono bg-orange-500/10 px-2 py-0.5 rounded"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DESKTOP STICKY SCROLL LAYOUT (md and up) */}
      <section
        ref={containerRef}
        className="hidden md:block relative h-[400vh] bg-black pt-32"
      >
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute top-0 left-0 right-0 text-center z-50 pointer-events-none"
          >
            <p className="text-orange-500 tracking-widest uppercase text-sm font-semibold mb-3">
              The Anatomy
            </p>
            <h2 className="text-4xl md:text-6xl font-serif text-white font-bold uppercase tracking-wider">
              The Shield Tech
            </h2>
          </motion.div>

          <div
            ref={wrapperRef}
            className="relative w-full max-w-7xl h-full flex items-center justify-center overflow-hidden"
          >
            {/* 1. Lid */}
            <motion.div
              style={{
                opacity: coords ? lidOpacity : 0,
                x: lidX,
                y: "-50%",
                left: coords ? `${coords.centerX + coords.xOffset}px` : undefined,
                top: coords ? `${coords.centerY - coords.cupHeight * 0.28}px` : undefined,
              }}
              className="absolute max-w-[280px] text-left z-40"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] border border-orange-500/50 text-orange-500 px-1 font-mono">
                  T-01
                </span>
                <h3 className="text-xl text-white font-bold uppercase tracking-tight">
                  Damped Leak-Proof Lid
                </h3>
              </div>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Engineered precision seal. Toss it in your bag with zero hesitation.
              </p>
              <ul className="text-[10px] text-orange-500/60 font-mono space-y-1 border-l border-orange-500/20 pl-3 uppercase tracking-wider">
                <li>&gt; 1.2BAR PRESSURE</li>
                <li>&gt; DAMPED HINGE</li>
                <li>&gt; BPA-FREE TRITAN</li>
              </ul>
            </motion.div>

            {/* 2. Vacuum */}
            <motion.div
              style={{
                opacity: coords ? vacuumOpacity : 0,
                x: vacuumX,
                y: "-50%",
                right: coords ? `${coords.centerX + coords.xOffset}px` : undefined,
                top: coords ? `${coords.centerY - coords.cupHeight * 0.08}px` : undefined,
              }}
              className="absolute max-w-[280px] text-right z-40"
            >
              <div className="flex items-center gap-2 mb-2 justify-end">
                <h3 className="text-xl text-white font-bold uppercase tracking-tight">
                  Double-Wall Vacuum
                </h3>
                <span className="text-[9px] border border-orange-500/50 text-orange-500 px-1 font-mono">
                  T-02
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Advanced thermal lockdown. 24h cold, 12h piping hot.
              </p>
              <ul className="text-[10px] text-orange-500/60 font-mono space-y-1 border-r border-orange-500/20 pr-3 uppercase tracking-wider">
                <li>&gt; 0.001PA VACUUM</li>
                <li>&gt; COPPER LAYER</li>
                <li>&gt; GETTER MATERIAL</li>
              </ul>
            </motion.div>

            {/* 3. Inner Wall */}
            <motion.div
              style={{
                opacity: coords ? innerOpacity : 0,
                x: innerX,
                y: "-50%",
                left: coords ? `${coords.centerX + coords.xOffset}px` : undefined,
                top: coords ? `${coords.centerY + coords.cupHeight * 0.12}px` : undefined,
              }}
              className="absolute max-w-[280px] text-left z-40"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] border border-orange-500/50 text-orange-500 px-1 font-mono">
                  T-03
                </span>
                <h3 className="text-xl text-white font-bold uppercase tracking-tight">
                  Med-Grade 316L
                </h3>
              </div>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Resists corrosion and flavor transfer. Pure taste, always.
              </p>
              <ul className="text-[10px] text-orange-500/60 font-mono space-y-1 border-l border-orange-500/20 pl-3 uppercase tracking-wider">
                <li>&gt; 316L REINFORCED</li>
                <li>&gt; ELECTRO-POLISHED</li>
                <li>&gt; ION-NEUTRAL</li>
              </ul>
            </motion.div>

            {/* 4. Base */}
            <motion.div
              style={{
                opacity: coords ? baseOpacity : 0,
                x: baseX,
                y: "-50%",
                right: coords ? `${coords.centerX + coords.xOffset}px` : undefined,
                top: coords ? `${coords.centerY + coords.cupHeight * 0.32}px` : undefined,
              }}
              className="absolute max-w-[280px] text-right z-40"
            >
              <div className="flex items-center gap-2 mb-2 justify-end">
                <h3 className="text-xl text-white font-bold uppercase tracking-tight">
                  Anti-Slip Silicone
                </h3>
                <span className="text-[9px] border border-orange-500/50 text-orange-500 px-1 font-mono">
                  T-04
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Stands firm on any surface. Silent landing, zero sliding.
              </p>
              <ul className="text-[10px] text-orange-500/60 font-mono space-y-1 border-r border-orange-500/20 pr-3 uppercase tracking-wider">
                <li>&gt; 85 SHORE-A</li>
                <li>&gt; IMPACT-RESISTANT</li>
                <li>&gt; MODULAR BASE</li>
              </ul>
            </motion.div>

            {/* Central Tumbler Image */}
            <motion.div
              ref={cupRef}
              style={{ scale: cupScale }}
              className="w-full max-w-md h-[55vh] z-10 flex justify-center items-center pointer-events-none"
            >
              <img
                src="/images/tech_tumbler.png"
                alt="Standing Shield Anatomy"
                className="object-contain h-full mix-blend-lighten drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
