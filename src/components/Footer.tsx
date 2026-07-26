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
                <span>
                  <span className="block text-white font-medium mb-1">Global Sourcing HQ · China</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Yiwu%20International%20Trade%20City%20Zone%206%2C%20Yiwu%2C%20Zhejiang%2C%20China"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Yiwu International Trade City, Zone 6, B168, Yiwu, Zhejiang, China
                  </a>
                  <span className="block text-white font-medium mt-3 mb-1">SEA Fulfillment Center · Thailand</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Bangkok%20Free%20Trade%20Zone%2C%20Bang%20Phli%2C%20Samut%20Prakan%2010540%2C%20Thailand"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Bangkok Free Trade Zone 7, Bang Phli Yai, Bang Phli District, Samut Prakan 10540, Thailand
                  </a>
                </span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="w-5 h-5 mr-3 flex-shrink-0 text-orange-500" />
                <span>
                  <a href="tel:+8615320012861" className="block hover:text-white transition-colors">China: +86 15320012861</a>
                  <a href="tel:+66827936884" className="block hover:text-white transition-colors">Thailand: +66 827936884</a>
                </span>
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
            {[
              { name: "Visa", src: "/images/logos/payments/visa.svg", h: "max-h-[18px]" },
              { name: "Mastercard", src: "/images/logos/payments/mastercard.svg", h: "max-h-[24px]" },
              { name: "American Express", src: "/images/logos/payments/amex.svg", h: "max-h-[24px]" },
              { name: "PayPal", src: "/images/logos/payments/paypal.svg", h: "max-h-[18px]" },
              { name: "Apple Pay", src: "/images/logos/payments/applepay.svg", h: "max-h-[18px]" },
              { name: "Google Pay", src: "/images/logos/payments/gpay.svg", h: "max-h-[18px]" },
            ].map((method) => (
              <span
                key={method.name}
                title={method.name}
                className="flex items-center justify-center h-8 w-14 bg-white rounded-md px-2"
              >
                <img
                  src={method.src}
                  alt={method.name}
                  loading="lazy"
                  className={`${method.h} max-w-full w-auto object-contain`}
                />
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
