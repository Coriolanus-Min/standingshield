import HeroCarousel from "@/components/HeroCarousel";
import Navbar from "@/components/Navbar";
import TrustBar from "@/components/TrustBar";
import ProductsGrid from "@/components/ProductsGrid";
import TechBreakdown from "@/components/TechBreakdown";
import FactoryProcess from "@/components/FactoryProcess";
import LifestyleGallery from "@/components/LifestyleGallery";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-between">
      <Navbar />
      <HeroCarousel />
      <TrustBar />
      <div id="products" className="w-full scroll-mt-20">
        <ProductsGrid />
      </div>
      <div id="tech" className="w-full scroll-mt-20">
        <TechBreakdown />
      </div>
      <div id="factory" className="w-full scroll-mt-20">
        <FactoryProcess />
      </div>
      <LifestyleGallery />
      <Testimonials />
      <Partners />
      <Newsletter />
      <Footer />
    </main>
  );
}
