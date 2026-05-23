import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "shield-30oz",
    slug: "shield-tumbler-30oz",
    name: "30oz Shield Tumbler",
    subtitle: "The All-Scene Champion",
    price: 39.99,
    capacity: "30oz / 887ml",
    category: "Tumbler",
    badge: "Best Seller",
    description:
      "The flagship Standing Shield tumbler. Engineered with double-wall vacuum insulation to keep beverages cold for 24 hours or hot for 12 hours. Features our signature laser-engraved camel rider logo on a premium matte finish. The damped leak-proof lid and anti-slip silicone base make it the ultimate companion for any scene — gym, office, trail, or road.",
    shortDescription:
      "Flagship 30oz tumbler with 24h cold / 12h hot insulation and signature laser engraving.",
    colors: [
      {
        id: "black",
        name: "Midnight Black",
        hex: "#111111",
        image: "/images/tumbler_midnight_black_1772804852319.png",
        available: true,
      },
      {
        id: "grey",
        name: "Meteorite Grey",
        hex: "#4a4a4a",
        image: "/images/tumbler_meteorite_grey_1772804871359.png",
        available: true,
      },
      {
        id: "oatmeal",
        name: "Oatmeal Beige",
        hex: "#dcd6cd",
        image: "/images/tumbler_oatmeal_1772804907053.png",
        available: true,
      },
    ],
    features: [
      "Double-wall vacuum insulation (24h cold / 12h hot)",
      "Medical-grade 316L stainless steel inner wall",
      "Precision damped leak-proof lid",
      "Anti-slip silicone base",
      "Signature blue laser-engraved camel rider logo",
      "Premium matte powder-coat finish",
      "BPA-free and dishwasher safe",
    ],
    specs: {
      Capacity: "30oz / 887ml",
      Weight: "380g",
      Height: "21.5cm",
      Diameter: "8.5cm",
      Material: "316L Stainless Steel",
      Insulation: "Double-Wall Vacuum",
      Lid: "Damped Screw-On Leak-Proof",
      Base: "Anti-Slip Silicone",
      Finish: "Matte Powder-Coat",
    },
    minOrder: 100,
    inStock: true,
    rating: 4.9,
    reviewCount: 128,
  },
  {
    id: "shield-20oz",
    slug: "shield-tumbler-20oz",
    name: "20oz Shield Tumbler",
    subtitle: "Urban Minimalist",
    price: 34.99,
    capacity: "20oz / 591ml",
    category: "Tumbler",
    badge: "New",
    description:
      "A compact, commuter-friendly version of the Shield Tumbler. Fits seamlessly into car cup holders and backpack side pockets. Same military-grade insulation and laser-engraved craftsmanship, now in a sleek 20oz silhouette designed for the urban rush.",
    shortDescription:
      "Compact 20oz commuter tumbler. Fits standard cup holders with the same premium insulation.",
    colors: [
      {
        id: "black",
        name: "Midnight Black",
        hex: "#111111",
        image: "/images/tumbler_midnight_black_1772804852319.png",
        available: true,
      },
      {
        id: "grey",
        name: "Meteorite Grey",
        hex: "#4a4a4a",
        image: "/images/tumbler_meteorite_grey_1772804871359.png",
        available: true,
      },
      {
        id: "oatmeal",
        name: "Oatmeal Beige",
        hex: "#dcd6cd",
        image: "/images/tumbler_oatmeal_1772804907053.png",
        available: true,
      },
    ],
    features: [
      "Double-wall vacuum insulation (20h cold / 10h hot)",
      "Medical-grade 316L stainless steel",
      "Compact commuter silhouette",
      "Fits standard car cup holders",
      "Signature laser-engraved logo",
      "Premium matte powder-coat finish",
      "BPA-free and dishwasher safe",
    ],
    specs: {
      Capacity: "20oz / 591ml",
      Weight: "290g",
      Height: "17.5cm",
      Diameter: "7.5cm",
      Material: "316L Stainless Steel",
      Insulation: "Double-Wall Vacuum",
      Lid: "Damped Screw-On Leak-Proof",
      Base: "Anti-Slip Silicone",
      Finish: "Matte Powder-Coat",
    },
    minOrder: 100,
    inStock: true,
    rating: 4.8,
    reviewCount: 64,
  },
  {
    id: "shield-40oz",
    slug: "shield-tumbler-40oz",
    name: "40oz Shield Tumbler",
    subtitle: "The Expedition",
    price: 44.99,
    capacity: "40oz / 1183ml",
    category: "Tumbler",
    description:
      "Built for all-day hydration on extended adventures. The 40oz Expedition features an oversized double-wall vacuum chamber for maximum thermal retention. Wide-mouth design for easy cleaning and ice loading. The reinforced handle-compatible structure makes it the ultimate basecamp companion.",
    shortDescription:
      "Oversized 40oz tumbler for all-day hydration. Maximum thermal retention for extended adventures.",
    colors: [
      {
        id: "black",
        name: "Midnight Black",
        hex: "#111111",
        image: "/images/tumbler_midnight_black_1772804852319.png",
        available: true,
      },
      {
        id: "grey",
        name: "Meteorite Grey",
        hex: "#4a4a4a",
        image: "/images/tumbler_meteorite_grey_1772804871359.png",
        available: true,
      },
      {
        id: "oatmeal",
        name: "Oatmeal Beige",
        hex: "#dcd6cd",
        image: "/images/tumbler_oatmeal_1772804907053.png",
        available: true,
      },
    ],
    features: [
      "Double-wall vacuum insulation (28h cold / 14h hot)",
      "Medical-grade 316L stainless steel",
      "Wide-mouth design for ice and easy cleaning",
      "Handle-compatible reinforced structure",
      "Signature laser-engraved logo",
      "Premium matte powder-coat finish",
      "BPA-free and dishwasher safe",
    ],
    specs: {
      Capacity: "40oz / 1183ml",
      Weight: "460g",
      Height: "25cm",
      Diameter: "9.5cm",
      Material: "316L Stainless Steel",
      Insulation: "Double-Wall Vacuum",
      Lid: "Damped Screw-On Leak-Proof",
      Base: "Anti-Slip Silicone",
      Finish: "Matte Powder-Coat",
    },
    minOrder: 100,
    inStock: true,
    rating: 4.7,
    reviewCount: 42,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getAllCategories(): string[] {
  return [...new Set(products.map((p) => p.category))];
}
