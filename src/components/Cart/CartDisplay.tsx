"use client";

import Image from "next/image";
import { PopulatedCartDocument } from "@/app/types/cartTypes";

interface CartDisplayProps {
  cart: PopulatedCartDocument;
  selectedCartIds?: Set<string>;
  onToggle?: (cartId: string) => void;
  onDelete?: (cartId: string) => void;
}

export default function CartDisplay({
  cart,
  selectedCartIds,
  onToggle,
  onDelete,
}: CartDisplayProps) {
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-3xl">Empty</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">
          Your cart is empty
        </h3>
        <p className="text-gray-500 mt-2">
          Looks like you haven&apos;t added anything yet.
        </p>
      </div>
    );
  }

  const lineTotal = Number(cart.subtotal || 0);

  return (
    <div
      className={`bg-white rounded-2xl p-5 md:p-6 shadow-sm border transition ${
        selectedCartIds?.has(cart.cartId)
          ? "border-orange-400 ring-2 ring-orange-200"
          : "border-gray-100 hover:border-orange-200"
      }`}>
      <div className="space-y-6">
        {cart.items.map((item) => (
          <div
            key={item.foodId}
            className="flex flex-col md:flex-row md:items-center gap-4 py-4 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedCartIds?.has(cart.cartId) ?? false}
                onChange={() => onToggle?.(cart.cartId)}
                className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <div className="relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                <Image
                  src={item.food?.image || "/placeholder.png"}
                  alt={item.food?.name || "Food Item"}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {item.food?.name}
              </h3>
              <p className="text-gray-500 text-sm">
                ${item.food?.price.toFixed(2)} / item
              </p>
              <div className="mt-3 inline-flex items-center gap-3 rounded-full bg-gray-50 px-3 py-1 text-sm text-gray-600">
                <span>Qty</span>
                <span className="font-semibold text-gray-900">
                  {item.quantity}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end md:flex-col md:items-end gap-2">
              <button
                onClick={() => onDelete?.(cart.cartId)}
                className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-100">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Cart Total</span>
          <span className="text-2xl font-semibold text-gray-900">
            ${lineTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
