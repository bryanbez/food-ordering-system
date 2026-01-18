"use client";

import { useState, useMemo, useEffect } from "react";
import { useCart } from "../hooks/useCart";
import CartDisplay from "@/components/Cart/CartDisplay";
import type { PopulatedCartDocument } from "../types/cartTypes";

export default function CartPage() {
  const {
    cart,
    isLoading,
    error,
    deleteCart,
    calculateTotalAmount,
    selectedCartIds,
    setSelectedCartIds,
  } = useCart();
  const [selectedTotal, setSelectedTotal] = useState<number>(0);
  const [isTotalCalculating, setIsTotalCalculating] = useState<boolean>(false);

  const handleToggleCart = (cartId: string) => {
    const next = new Set(selectedCartIds);
    if (next.has(cartId)) {
      next.delete(cartId);
    } else {
      next.add(cartId);
    }
    setSelectedCartIds(next);
  };

  useEffect(() => {
    if (selectedCartIds.size === 0) {
      setSelectedTotal(0);
      setIsTotalCalculating(false);
      return;
    }

    setIsTotalCalculating(true);
    const timer = setTimeout(async () => {
      const total = await calculateTotalAmount(Array.from(selectedCartIds));
      setSelectedTotal(total);
      setIsTotalCalculating(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [selectedCartIds, calculateTotalAmount]);

  const totalItems = useMemo(() => {
    if (!cart) return 0;
    return cart.reduce(
      (total: number, c: PopulatedCartDocument) =>
        total +
        c.items.reduce(
          (itemTotal: number, item: { quantity: number }) =>
            itemTotal + item.quantity,
          0,
        ),
      0,
    );
  }, [cart]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
        <div className="w-[92%] max-w-6xl mx-auto py-10">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Your Cart
          </h1>
          <p className="text-gray-500 mb-8">
            Review your items and checkout when you&apos;re ready.
          </p>
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
        <div className="w-[92%] max-w-6xl mx-auto py-10">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Your Cart
          </h1>
          <p className="text-gray-500 mb-8">
            Review your items and proceed to checkout.
          </p>
          <div className="bg-red-50 text-red-600 p-4 rounded-xl">
            Error loading cart. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      <div className="w-[92%] max-w-6xl mx-auto py-10">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Your Cart</h1>
            <p className="text-gray-500 mt-1">
              Review your items and checkout when you&apos;re ready.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-orange-100 shadow-sm">
            <span className="text-sm text-gray-500">Items</span>
            <span className="text-lg font-semibold text-orange-600">
              {totalItems}
            </span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            {cart?.map((item: PopulatedCartDocument) => (
              <CartDisplay
                key={item.cartId}
                cart={item}
                selectedCartIds={selectedCartIds}
                onToggle={handleToggleCart}
                onDelete={deleteCart}
              />
            ))}
          </div>

          <aside className="h-fit rounded-2xl bg-white border border-orange-100 shadow-lg shadow-orange-200/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Order Summary
              </h2>
              {isTotalCalculating && (
                <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                  Calculating
                </span>
              )}
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Selected items</span>
              <span>{selectedCartIds.size}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-base text-gray-700">
              <span>Estimated tax</span>
              <span>$0.00</span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm text-gray-500">Selected Total</span>
              <span className="text-2xl font-semibold text-gray-900">
                ${selectedTotal.toFixed(2)}
              </span>
            </div>
            <button
              disabled={selectedCartIds.size === 0 || isTotalCalculating}
              className="mt-6 w-full py-4 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 active:scale-[0.98] transform disabled:bg-gray-300 disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed">
              Checkout Now
            </button>
            <p className="mt-4 text-xs text-gray-400">
              You&apos;ll be able to review delivery details on the next step.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
