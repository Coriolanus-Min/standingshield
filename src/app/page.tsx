import HeroCarousel from "@/components/HeroCarousel";
import Navbar from "@/components/Navbar";
import ProductsGrid from "@/components/ProductsGrid";
import TechBreakdown from "@/components/TechBreakdown";
import FactoryProcess from "@/components/FactoryProcess";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-between">
      <Navbar />
      <HeroCarousel />
      <div id="products" className="w-full scroll-mt-20">
        <ProductsGrid />
      </div>
      <div id="tech" className="w-full scroll-mt-20">
        <TechBreakdown />
      </div>
      <div id="factory" className="w-full scroll-mt-20">
        <FactoryProcess />
      </div>
      <Partners />
      <Footer />
    </main>
  );
}
