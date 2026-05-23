export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  image: string;
  available: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  capacity: string;
  category: string;
  badge?: string;
  description: string;
  shortDescription: string;
  colors: ProductColor[];
  features: string[];
  specs: Record<string, string>;
  minOrder: number;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  productId: string;
  colorId: string;
  quantity: number;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
  color: ProductColor;
  unitPrice: number;
  lineTotal: number;
}
