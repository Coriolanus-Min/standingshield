import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1 border-r border-white/10 pr-8 hidden md:block">
             <h2 className="text-white font-serif text-3xl tracking-widest uppercase font-bold mb-4 w-full">
               Standing<br/><span className="text-orange-500 opacity-80 text-xl font-light lowercase font-sans block mt-1">shield</span>
             </h2>
             <p className="text-gray-400 text-sm mt-6 leading-relaxed">
               Hardcore insulation meets urban aesthetics. We engineer premium, laser-engraved stainless steel drinkware built for the wild, sleek enough for the city. 
             </p>
          </div>

          <div className="col-span-1 md:hidden mb-8">
             <h2 className="text-white font-serif text-2xl tracking-widest uppercase font-bold mb-2">
               Standing <span className="text-orange-500 opacity-80 text-lg font-light lowercase font-sans">shield</span>
             </h2>
             <p className="text-gray-400 text-sm mt-4">Premium insulated drinkware for every scene.</p>
          </div>

          {/* About Us */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold uppercase tracking-wider mb-6 text-white border-b border-orange-500/50 pb-2 inline-block">About Us</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-gray-400 hover:text-orange-500 transition-colors">Our Story</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-orange-500 transition-colors">All Products</Link></li>
              <li><Link href="/#factory" className="text-gray-400 hover:text-orange-500 transition-colors">Factory & Process</Link></li>
              <li><Link href="/#tech" className="text-gray-400 hover:text-orange-500 transition-colors">Material Science</Link></li>
              <li><Link href="/about#sustainability" className="text-gray-400 hover:text-orange-500 transition-colors">Sustainability</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Wholesale & Support */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold uppercase tracking-wider mb-6 text-white border-b border-orange-500/50 pb-2 inline-block">Support</h3>
            <ul className="space-y-4">
              <li><Link href="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">B2B Wholesale Inquiry</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">Custom Logo Etching</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-orange-500 transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-orange-500 transition-colors">Lifetime Warranty</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-orange-500 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold uppercase tracking-wider mb-6 text-white border-b border-orange-500/50 pb-2 inline-block">Contact</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start text-gray-400">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-orange-500" />
                <span>Address 1: China Zhejiang Province Yiwu City, Yiwu International Trade City, Zone 6, B168<br />Address 2: Bangkok Free Trade Zone 7, Bang Phli Yai, Bang Phli District, Samut Prakan 10540, Thailand</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="w-5 h-5 mr-3 flex-shrink-0 text-orange-500" />
                <span>China: +86 15320012861<br />Thailand: +66 827936884</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="w-5 h-5 mr-3 flex-shrink-0 text-orange-500" />
                <a href="mailto:publicuse113@gmail.com" className="hover:text-white transition-colors">publicuse113@gmail.com</a>
              </li>
            </ul>

            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm order-2 md:order-1">
            &copy; {new Date().getFullYear()} Standing Shield. All rights reserved.
          </p>

          {/* Payment methods */}
          <div className="flex flex-wrap items-center justify-center gap-2 order-1 md:order-2" aria-label="Accepted payment methods">
            <span className="flex items-center gap-1.5 border border-white/10 rounded-md px-2.5 py-1.5" title="Mastercard">
              <span className="w-3.5 h-3.5 rounded-full bg-red-500/80" />
              <span className="w-3.5 h-3.5 rounded-full bg-orange-400/80 -ml-3" />
            </span>
            {["VISA", "AMEX", "PayPal", "Apple Pay", "G Pay"].map((method) => (
              <span
                key={method}
                className="border border-white/10 rounded-md px-2.5 py-1.5 text-[10px] font-semibold tracking-wider text-gray-400"
              >
                {method}
              </span>
            ))}
          </div>

          <div className="flex space-x-6 text-sm order-3">
            <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
