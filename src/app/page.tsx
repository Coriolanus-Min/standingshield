import HeroCarousel from "@/components/HeroCarousel";
import Navbar from "@/components/Navbar";
import TechBreakdown from "@/components/TechBreakdown";
import FactoryProcess from "@/components/FactoryProcess";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-between">
      <Navbar />
      <HeroCarousel />
      <TechBreakdown />
      <FactoryProcess />
      <Partners />
      <Footer />
    </main>
  );
}
