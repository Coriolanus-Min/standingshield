import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "shield-aerolight-16oz",
    slug: "aerolight-transit-bottle-16oz",
    name: "16oz AeroLight Transit Bottle",
    subtitle: "Feather-Weight Commuter Series",
    price: 36.99,
    capacity: "16oz / 470ml",
    category: "Transit Bottle",
    badge: "Best Seller",
    description:
      "Engineered with Standing Shield Feather-Weight Insulation™ to deliver 33% lighter carry without compromising thermal retention. Features a slim stepped-shoulder silhouette that slips effortlessly into commuter backpacks and car cup holders, topped with a crystal-clear low-profile drink-through lid and our signature laser-etched camel rider emblem.",
    shortDescription:
      "Ultra-lightweight 16oz stepped-shoulder commuter bottle with crystal-clear flip lid and signature camel rider etching.",
    colors: [
      {
        id: "silver",
        name: "Brushed Steel Silver",
        hex: "#c8ccd0",
        image: "/images/products/style2_transit_silver_main.png",
        gallery: [
          "/images/products/style2_transit_silver_main.png",
          "/images/products/style2_transit_shelf_band.png",
          "/images/products/style2_transit_lifestyle.png",
          "/images/products/style2_transit_black_main.png",
        ],
        available: true,
      },
      {
        id: "black",
        name: "Obsidian Matte Black",
        hex: "#18181b",
        image: "/images/products/style2_transit_black_main.png",
        gallery: [
          "/images/products/style2_transit_black_main.png",
          "/images/products/style2_transit_shelf_band.png",
          "/images/products/style2_transit_lifestyle.png",
          "/images/products/style2_transit_silver_main.png",
        ],
        available: true,
      },
    ],
    features: [
      "Feather-Weight spun stainless steel (33% lighter than standard bottles)",
      "Double-wall vacuum insulation (20h cold / 10h hot)",
      "Crystal-clear Tritan™ low-profile leak-proof transit lid",
      "Stepped ergonomic shoulder with slim commuter profile",
      "Signature Standing Shield camel-rider laser engraving",
      "Fits all standard car cup holders and bike cages",
      "BPA-free and dishwasher safe",
    ],
    specs: {
      Capacity: "16oz / 470ml",
      Weight: "245g",
      Height: "20.2cm",
      Diameter: "6.9cm",
      Material: "316L Spun Stainless Steel",
      Insulation: "Feather-Weight Double-Wall Vacuum",
      Lid: "Clear Low-Profile Flip Transit Lid",
      Base: "Brushed Anti-Slip Steel Base",
      Finish: "Satin Brushed / Matte Powder-Coat",
    },
    minOrder: 100,
    inStock: true,
    rating: 4.9,
    reviewCount: 156,
  },
  {
    id: "shield-pocket-coffee-10oz",
    slug: "pocket-strap-coffee-tumbler-300ml",
    name: "300mL Pocket Strap Coffee Cup",
    subtitle: "Boutique Carry Edition",
    price: 32.99,
    capacity: "10oz / 300ml",
    category: "Coffee Cup",
    badge: "New Arrival",
    description:
      "Designed for espresso lovers and style-conscious commuters. This compact 300mL tapered coffee cup pairs a metallic champagne-bronze or matte black body with a leak-proof forest-green barista lid, complete with a detachable gold-threaded braided wrist lanyard and custom Standing Shield camel medallion charm.",
    shortDescription:
      "Compact 300mL barista coffee tumbler with detachable braided wrist strap, camel medallion charm, and gift box.",
    colors: [
      {
        id: "champagne",
        name: "Champagne Bronze & Forest Green",
        hex: "#9e8c70",
        image: "/images/products/style3_coffee_champagne_main.png",
        gallery: [
          "/images/products/style3_coffee_champagne_main.png",
          "/images/products/style3_coffee_giftbox.png",
          "/images/products/style3_coffee_lifestyle.png",
          "/images/products/style3_coffee_black_main.png",
        ],
        available: true,
      },
      {
        id: "black",
        name: "Midnight Black Edition",
        hex: "#141414",
        image: "/images/products/style3_coffee_black_main.png",
        gallery: [
          "/images/products/style3_coffee_black_main.png",
          "/images/products/style3_coffee_giftbox.png",
          "/images/products/style3_coffee_lifestyle.png",
          "/images/products/style3_coffee_champagne_main.png",
        ],
        available: true,
      },
    ],
    features: [
      "Detachable hand-braided wrist strap with custom camel coin charm",
      "Double-wall vacuum insulation (12h cold / 6h piping hot)",
      "Barista-friendly wide mouth for latte art and aroma retention",
      "Silicone-sealed splash-proof sip lid with lanyard loop",
      "Includes luxury hot-stamped Standing Shield gift box",
      "Signature camel-rider emblem etched on the front body",
      "316L medical-grade stainless steel interior",
    ],
    specs: {
      Capacity: "10oz / 300ml",
      Weight: "210g",
      Height: "13.2cm",
      Diameter: "8.2cm",
      Material: "316L Stainless Steel",
      Insulation: "Double-Wall Vacuum",
      Lid: "Barista Sip Lid with Strap Ring",
      Base: "Contoured Cushion Base",
      Finish: "Metallic Anodized / Matte Coat",
    },
    minOrder: 100,
    inStock: true,
    rating: 4.9,
    reviewCount: 94,
  },
  {
    id: "shield-pet-ceramic-480ml",
    slug: "cute-pet-ceramic-bottle-480ml",
    name: "480mL Cute Pet Ceramic Bottle",
    subtitle: "3D Silicone Lid & Ceramic Inner",
    price: 38.99,
    capacity: "16.2oz / 480ml",
    category: "Ceramic Bottle",
    badge: "Ceramic Lined",
    description:
      "Playful character meets uncompromising thermal performance. Featuring a pure ceramic-coated inner liner that preserves the authentic taste of coffee, milk tea, and fruit infusions without any metallic aftertaste. Crowned with a 3D soft-touch sculpted animal screw cap, polished stainless steel base rim, and Standing Shield branding.",
    shortDescription:
      "480mL ceramic-lined insulated bottle with 3D sculpted animal lid and polished stainless steel base ring.",
    colors: [
      {
        id: "pink-cat",
        name: "Blush Pink Kitten",
        hex: "#ebb8c4",
        image: "/images/products/style1_pet_pink_cat_main.png",
        gallery: [
          "/images/products/style1_pet_pink_cat_main.png",
          "/images/products/style1_pet_family_lineup.png",
          "/images/products/style1_pet_lifestyle.png",
          "/images/products/style1_pet_cow_main.png",
        ],
        available: true,
      },
      {
        id: "cow",
        name: "Spotted Dairy Cow",
        hex: "#f3f4f6",
        image: "/images/products/style1_pet_cow_main.png",
        gallery: [
          "/images/products/style1_pet_cow_main.png",
          "/images/products/style1_pet_family_lineup.png",
          "/images/products/style1_pet_lifestyle.png",
          "/images/products/style1_pet_pink_cat_main.png",
        ],
        available: true,
      },
    ],
    features: [
      "True ceramic-coated inner liner — zero metallic taste, acid & milk safe",
      "3D sculpted food-grade silicone animal character screw lid",
      "360° leak-proof seal with hidden thermal insulation core",
      "Mirror-polished stainless steel anti-collision bottom rim",
      "Double-wall vacuum insulation (24h cold / 12h hot)",
      "Signature Standing Shield camel-rider mark at the lower front",
      "Full 7-character collectible mold series available for B2B OEM",
    ],
    specs: {
      Capacity: "16.2oz / 480ml",
      Weight: "310g",
      Height: "19.5cm",
      Diameter: "7.4cm",
      Material: "316L Steel + Ceramic Coating Inner",
      Insulation: "Double-Wall Vacuum + Ceramic Shield",
      Lid: "3D Sculpted Character Screw Cap",
      Base: "Mirror-Polished Steel Rim",
      Finish: "Soft-Touch Matte / Pattern Coat",
    },
    minOrder: 100,
    inStock: true,
    rating: 4.8,
    reviewCount: 112,
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
