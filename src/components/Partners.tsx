"use client";

import { motion } from "framer-motion";

const platformsTop = [
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", url: "#" },
  { name: "Temu", logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Temu_logo.svg", url: "#" },
  { name: "AliExpress", logo: "https://upload.wikimedia.org/wikipedia/commons/2/23/Aliexpress-logo.svg", url: "#" },
  { name: "Shopee", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg", url: "#" },
  { name: "Lazada", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Lazada_%282019%29.svg", url: "#" },
  { name: "Wish", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Wish_Company_Logo.svg", url: "#" },
];

const platformsBottom = [
  { name: "SHEIN", logo: "https://upload.wikimedia.org/wikipedia/commons/1/13/Shein_logo.png", url: "#" },
  { name: "eBay", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg", url: "#" },
  { name: "DHgate", logo: "https://www.dhresource.com/mobile/images/dh_logo_2016.png", url: "#" },
  { name: "Alibaba", logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Alibaba_Group_logo.svg", url: "#" },
  { name: "Global Sources", logo: "https://logodix.com/logo/1845688.jpg", url: "#" },
  { name: "Walmart", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg", url: "#" },
];

export default function Partners() {
  return (
    <section className="py-24 bg-[#0a0a0a] overflow-hidden border-t border-white/10">
      <div className="mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-serif text-white uppercase tracking-wider mb-4">Global Distribution</h2>
        <p className="text-gray-400 max-w-2xl mx-auto px-4">Supplying premium drinkware at scale across the world's most dominant e-commerce and wholesale platforms.</p>
      </div>

      {/* Top Row - Moving Left */}
      <div className="relative w-full flex overflow-hidden mb-12 group">
        <motion.div 
          className="flex whitespace-nowrap gap-16 px-8 items-center"
          style={{ touchAction: 'pan-y' }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        >
          {/* Duplicate the array twice to create a seamless infinite loop */}
          {[...platformsTop, ...platformsTop, ...platformsTop, ...platformsTop].map((platform, i) => (
            <a 
              key={`top-${i}`} 
              href={platform.url}
              className="flex items-center justify-center w-48 h-20 px-8 py-4 bg-white rounded-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all"
              title={platform.name}
            >
              <img 
                src={platform.logo} 
                alt={platform.name} 
                className="max-h-12 w-auto object-contain"
                onError={(e) => {
                  // Fallback to text if logo fails to load (React-safe approach)
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('span')) {
                     const span = document.createElement('span');
                     span.innerText = platform.name;
                     span.className = "text-black font-bold text-xl";
                     parent.appendChild(span);
                  }
                }}
              />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Bottom Row - Moving Right */}
      <div className="relative w-full flex overflow-hidden group">
        <motion.div 
          className="flex whitespace-nowrap gap-16 px-8 items-center"
          style={{ touchAction: 'pan-y' }}
          animate={{ x: ["-50%", "0%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {[...platformsBottom, ...platformsBottom, ...platformsBottom, ...platformsBottom].map((platform, i) => (
            <a 
              key={`bottom-${i}`} 
              href={platform.url}
              className="flex items-center justify-center w-48 h-20 px-8 py-4 bg-white rounded-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all"
              title={platform.name}
            >
              <img 
                src={platform.logo} 
                alt={platform.name} 
                className="max-h-12 w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('span')) {
                     const span = document.createElement('span');
                     span.innerText = platform.name;
                     span.className = "text-black font-bold text-xl";
                     parent.appendChild(span);
                  }
                }}
              />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
