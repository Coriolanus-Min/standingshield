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
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Our Story</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Factory & Process</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Material Science</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Sustainability</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Wholesale & Support */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold uppercase tracking-wider mb-6 text-white border-b border-orange-500/50 pb-2 inline-block">Support</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">B2B Wholesale Inquiry</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Custom Logo Etching</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Lifetime Warranty</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold uppercase tracking-wider mb-6 text-white border-b border-orange-500/50 pb-2 inline-block">Contact</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start text-gray-400">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-orange-500" />
                <span>123 Industrial Park, Manufacturing District, Global Hub</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="w-5 h-5 mr-3 flex-shrink-0 text-orange-500" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="w-5 h-5 mr-3 flex-shrink-0 text-orange-500" />
                <a href="mailto:info@standingshield.com" className="hover:text-white transition-colors">b2b@standingshield.com</a>
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

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Standing Shield. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
