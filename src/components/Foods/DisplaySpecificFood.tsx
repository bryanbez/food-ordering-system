"use client";

import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Clock,
  Flame,
} from "lucide-react";
import { useState } from "react";
import { FoodDocument } from "@/app/types/foodType";

interface DisplaySpecificFoodProps {
  food: FoodDocument | null;
  isLoading: boolean;
  error: Error | null;
}

export default function DisplaySpecificFood({
  food,
  isLoading,
  error,
}: DisplaySpecificFoodProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleQuantityId = (type: "inc" | "dec") => {
    if (type === "dec" && quantity > 1) setQuantity((q) => q - 1);
    if (type === "inc") setQuantity((q) => q + 1);
  };

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    // TODO: integreate with cart context/store
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !food) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Oops! Food not found
        </h2>
        <p className="text-gray-600 mb-6">
          The item you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center">
      <div className="max-w-6xl w-full bg-white rounded-[40px] shadow-sm overflow-hidden min-h-[600px] flex flex-col md:flex-row relative">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all text-gray-700">
          <ChevronLeft size={24} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 relative bg-gray-100 h-[400px] md:h-auto group">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider rounded-full">
              {food.category}
            </span>
            {food.isAvailable ? (
              <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-bold uppercase tracking-wider rounded-full">
                Available
              </span>
            ) : (
              <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider rounded-full">
                Out of Stock
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
            {food.name}
          </h1>

          <div className="flex items-center gap-6 mb-8 text-gray-500 text-sm">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-gray-900">4.8</span>
              <span>(120+ reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>15-20 min</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame size={16} className="text-orange-500" />
              <span>150 kcal</span>
            </div>
          </div>

          <div className="text-3xl font-bold text-gray-900 mb-6 flex items-baseline gap-1">
            <span className="text-orange-500">$</span>
            {food.price.toFixed(2)}
          </div>

          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            {food.description ||
              "No description available for this delicious item. Trust us, it's worth it!"}
          </p>

          <div className="mt-auto space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              {/* Quantity Counter */}
              <div className="flex items-center justify-between bg-gray-100 rounded-full p-1 w-full sm:w-40 h-14">
                <button
                  onClick={() => handleQuantityId("dec")}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-gray-900 shadow-sm hover:shadow-md transition-all active:scale-95 disabled:opacity-50"
                  disabled={quantity <= 1}>
                  <Minus size={20} />
                </button>
                <span className="font-bold text-xl text-gray-900 w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityId("inc")}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-500 text-white shadow-md hover:bg-orange-600 shadow-orange-200 transition-all active:scale-95">
                  <Plus size={20} />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!food.isAvailable}
                className={`flex-1 h-14 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] ${
                  isAdded
                    ? "bg-green-500 text-white shadow-lg shadow-green-200"
                    : "bg-gray-900 text-white hover:bg-black shadow-xl shadow-gray-200"
                } ${!food.isAvailable ? "opacity-50 cursor-not-allowed" : ""}`}>
                {isAdded ? (
                  <>Added to Bag!</>
                ) : (
                  <>
                    Add to Bag
                    <ShoppingBag size={20} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
