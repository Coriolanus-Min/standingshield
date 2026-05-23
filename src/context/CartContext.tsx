"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect, ReactNode } from "react";
import { CartItem, CartItemWithProduct } from "@/types/product";
import { products, getProductById } from "@/data/products";

interface CartContextType {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  items: CartItem[];
  addItem: (productId: string, colorId: string, quantity?: number) => void;
  removeItem: (productId: string, colorId: string) => void;
  updateQuantity: (productId: string, colorId: string, quantity: number) => void;
  clearCart: () => void;

  totalItems: number;
  totalPrice: number;
  itemsWithProducts: CartItemWithProduct[];
}

const CART_STORAGE_KEY = "standing-shield-cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as CartItem[];
        setItems(parsed);
      }
    } catch {
      // ignore parse errors
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const addItem = useCallback((productId: string, colorId: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === productId && i.colorId === colorId
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === productId && i.colorId === colorId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { productId, colorId, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: string, colorId: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.colorId === colorId))
    );
  }, []);

  const updateQuantity = useCallback((productId: string, colorId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, colorId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.colorId === colorId
          ? { ...i, quantity }
          : i
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => setItems([]), []);

  const itemsWithProducts = useMemo((): CartItemWithProduct[] => {
    return items
      .map((item) => {
        const product = getProductById(item.productId);
        if (!product) return null;
        const color = product.colors.find((c) => c.id === item.colorId);
        if (!color) return null;
        const unitPrice = product.price;
        return {
          ...item,
          product,
          color,
          unitPrice,
          lineTotal: unitPrice * item.quantity,
        };
      })
      .filter((item): item is CartItemWithProduct => item !== null);
  }, [items]);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => itemsWithProducts.reduce((sum, i) => sum + i.lineTotal, 0),
    [itemsWithProducts]
  );

  const value = useMemo(
    () => ({
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      itemsWithProducts,
    }),
    [isCartOpen, openCart, closeCart, toggleCart, items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, itemsWithProducts]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
