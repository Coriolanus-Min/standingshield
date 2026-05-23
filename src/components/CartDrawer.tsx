"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShoppingBag, Truck, Minus, Plus, Trash2, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    itemsWithProducts,
    totalItems,
    totalPrice,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [checkoutHovered, setCheckoutHovered] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Sliding Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-[#0a0a0a] shadow-[0_0_50px_rgba(0,0,0,0.5)] z-50 flex flex-col border-l border-white/10"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-xl font-serif font-bold tracking-wider uppercase flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                Your Cart
                {totalItems > 0 && (
                  <span className="text-sm text-gray-500 font-normal normal-case">
                    ({totalItems} {totalItems === 1 ? "item" : "items"})
                  </span>
                )}
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              {itemsWithProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                  <Package className="w-16 h-16 text-white/10 mb-4" />
                  <h3 className="text-xl font-serif text-white mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Add products to your cart to get started with your wholesale order.
                  </p>
                  <button
                    onClick={closeCart}
                    className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors text-sm"
                  >
                    Browse Collection
                  </button>
                </div>
              ) : (
                <div className="p-6">
                  {/* Cart Items */}
                  <div className="space-y-6 mb-8">
                    {itemsWithProducts.map((item) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        key={`${item.productId}-${item.colorId}`}
                        className="flex gap-4 bg-white/[0.02] rounded-xl p-4 border border-white/5"
                      >
                        {/* Product Image */}
                        <Link
                          href={`/products/${item.product.slug}`}
                          onClick={closeCart}
                          className="w-20 h-20 flex-shrink-0 bg-gradient-to-b from-white/5 to-transparent rounded-lg flex items-center justify-center"
                        >
                          <img
                            src={item.color.image}
                            alt={item.product.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        </Link>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${item.product.slug}`}
                            onClick={closeCart}
                          >
                            <h4 className="text-white font-medium truncate hover:text-orange-400 transition-colors">
                              {item.product.name}
                            </h4>
                          </Link>
                          <p className="text-gray-500 text-xs mb-1">
                            {item.color.name}
                          </p>
                          <p className="text-orange-500 text-sm font-medium">
                            ${item.unitPrice.toFixed(2)} / unit
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.colorId,
                                    item.quantity - 1
                                  )
                                }
                                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm text-white w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.colorId,
                                    item.quantity + 1
                                  )
                                }
                                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() =>
                                removeItem(item.productId, item.colorId)
                              }
                              className="text-gray-500 hover:text-red-400 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Line Total */}
                        <div className="text-right flex-shrink-0">
                          <p className="text-white font-medium">
                            ${item.lineTotal.toFixed(2)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Shipping Notice */}
                  <div className="flex items-center text-xs text-orange-400 bg-orange-500/10 px-4 py-3 rounded-lg gap-2 border border-orange-500/20 mb-6">
                    <Truck className="w-4 h-4 flex-shrink-0" />
                    Ships globally via connected wholesale partners in 3-5 days.
                  </div>

                  {/* Order Summary */}
                  <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5 mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-white">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Shipping</span>
                      <span className="text-gray-400">Calculated at checkout</span>
                    </div>
                    <div className="border-t border-white/10 pt-3 mt-3 flex justify-between">
                      <span className="text-white font-medium">Total</span>
                      <span className="text-white font-bold text-lg">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Checkout Area */}
            {itemsWithProducts.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-black">
                <p className="text-xs text-center text-gray-500 mb-4 tracking-wide uppercase">
                  Select a partner to proceed
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onMouseEnter={() => setCheckoutHovered("amazon")}
                    onMouseLeave={() => setCheckoutHovered(null)}
                    className={`w-full py-3 bg-[#ff9900] text-black font-bold tracking-wide rounded-lg transition-all flex justify-center items-center ${
                      checkoutHovered === "amazon" ? "brightness-110" : ""
                    }`}
                  >
                    Amazon B2B
                  </button>
                  <button
                    onMouseEnter={() => setCheckoutHovered("alibaba")}
                    onMouseLeave={() => setCheckoutHovered(null)}
                    className={`w-full py-3 bg-[#FF6A00] text-white font-bold tracking-wide rounded-lg transition-all flex justify-center items-center ${
                      checkoutHovered === "alibaba" ? "brightness-110" : ""
                    }`}
                  >
                    Alibaba
                  </button>
                </div>
                <button className="w-full mt-3 py-3 border border-white/20 text-white font-medium tracking-wide rounded-lg hover:bg-white/5 transition-all text-sm">
                  Request Custom Quote (1000+ units)
                </button>
                <button
                  onClick={clearCart}
                  className="w-full mt-2 py-2 text-gray-500 text-xs hover:text-red-400 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
