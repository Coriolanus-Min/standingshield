import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mountain, Factory, Leaf, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story | Standing Shield",
  description:
    "Hardcore insulation meets urban aesthetics. Learn how Standing Shield engineers premium laser-engraved drinkware built for the wild and the city.",
};

const milestones = [
  { year: "2019", title: "First Prototype", text: "A workshop, a lathe, and a stubborn idea: a tumbler that outlasts the day." },
  { year: "2021", title: "Vacuum Mastery", text: "Our double-wall line hits 24h cold retention in third-party lab tests." },
  { year: "2023", title: "Laser Atelier", text: "In-house laser engraving studio opens — every camel rider etched to order." },
  { year: "2025", title: "Global B2B", text: "Wholesale partners in 30+ countries across every major marketplace." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img
          src="/images/lifestyle_mountain.png"
          alt="Standing Shield tumbler on a mountain summit at sunrise"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
        <div className="relative z-10 h-full flex flex-col items-center justify-end pb-20 text-center px-6">
          <p className="text-orange-500 tracking-widest uppercase text-sm font-semibold mb-3">Our Story</p>
          <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-wider max-w-3xl">
            With a Defender&apos;s Shield, Standing Strong
          </h1>
          <p className="text-gray-300 max-w-xl mt-4">
            We preserve warmth to bring you comfort — wherever you go.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-orange-500 tracking-widest uppercase text-xs font-semibold mb-3">The Mission</p>
          <h2 className="text-3xl md:text-4xl font-serif uppercase tracking-wider mb-6">
            Hardcore Insulation Meets Urban Aesthetics
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Standing Shield began with a simple frustration: drinkware that looked tough but
            couldn&apos;t survive a single trail season — or looked rugged but felt out of place
            on a boardroom table. We decided to build both into one object.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Every Shield tumbler is built from medical-grade 316L stainless steel, sealed with a
            copper-backed double-wall vacuum, and finished with our signature laser-engraved camel
            rider — a mark of endurance, carrying comfort across any terrain.
          </p>
        </div>
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10">
          <img
            src="/images/lifestyle_office.png"
            alt="Standing Shield tumbler on a designer desk"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Values */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8">
            <Mountain className="w-8 h-8 text-orange-500 mb-4" />
            <h3 className="text-lg font-bold uppercase tracking-wider mb-2">Built for the Wild</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Drop-tested, pressure-tested, and trail-proven. If it can&apos;t survive the mountain,
              it doesn&apos;t carry the camel.
            </p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8">
            <Factory className="w-8 h-8 text-orange-500 mb-4" />
            <h3 className="text-lg font-bold uppercase tracking-wider mb-2">Owned Manufacturing</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              From steel forming to laser etching, every step happens under our roof — full quality
              control, no compromises.
            </p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8" id="sustainability">
            <Leaf className="w-8 h-8 text-orange-500 mb-4" />
            <h3 className="text-lg font-bold uppercase tracking-wider mb-2">Sustainability</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              One bottle for life beats a thousand disposables. Recyclable steel, plastic-free
              packaging, and a lifetime warranty to prove it.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto pb-24">
        <h2 className="text-2xl md:text-4xl font-serif uppercase tracking-wider text-center mb-16">
          The Road So Far
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m) => (
            <div key={m.year} className="border-l-2 border-orange-500/40 pl-6">
              <span className="text-orange-500 font-mono text-sm">{m.year}</span>
              <h3 className="text-white font-bold mt-1 mb-2">{m.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lifestyle strip */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { src: "/images/lifestyle_picnic.png", alt: "Picnic in the park" },
            { src: "/images/lifestyle_car.png", alt: "Road trip cup holder fit" },
            { src: "/images/lifestyle_night.png", alt: "Bedside at night" },
            { src: "/images/lifestyle_autumn.png", alt: "Autumn outdoors" },
          ].map((img) => (
            <div key={img.src} className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 group">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto pb-24 text-center">
        <h2 className="text-3xl md:text-5xl font-serif uppercase tracking-wider mb-6">
          Carry Your Shield
        </h2>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-10 py-4 bg-white text-black rounded-full font-medium tracking-wide hover:bg-gray-200 transition-colors"
        >
          Explore the Collection <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      <Footer />
    </main>
  );
}
