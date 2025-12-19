"use client";

import { useRef } from "react";
import { Plus, Heart, ChevronLeft, ChevronRight } from "lucide-react";

const recommended = [
  {
    id: 1,
    name: "Caesar with Chicken",
    price: 10.99,
    weight: "200g",
    image:
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "Sale",
  },
  {
    id: 2,
    name: "Creamy Chicken Alfredo",
    price: 13.49,
    weight: "350g",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "New",
  },
  {
    id: 3,
    name: "Fresh Garden Salad",
    price: 8.49,
    weight: "180g",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Grilled Salmon",
    price: 18.99,
    weight: "300g",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a7270028d?q=80&w=1287&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Steak & Potatoes",
    price: 22.99,
    weight: "450g",
    image:
      "https://images.unsplash.com/photo-1558030006-450675393466?q=80&w=1331&auto=format&fit=crop",
  },
];

export default function RecommendedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Recommended For You</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {recommended.map((product) => (
          <div
            key={product.id}
            className="min-w-[240px] md:min-w-[280px] snap-start bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative flex flex-col justify-between border border-gray-50">
            {/* Wishlist Button */}
            <button className="absolute top-4 right-4 p-1.5 md:p-2 rounded-full bg-white/80 hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors z-10 border border-gray-100">
              <Heart size={18} />
            </button>

            {/* Badge */}
            {product.badge && (
              <div className="absolute top-4 left-4 z-10">
                {product.badge === "New" ? (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    New
                  </span>
                ) : (
                  <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    Sale
                  </span>
                )}
              </div>
            )}

            <div>
              {/* Image Container */}
              <div className="relative aspect-square mb-4 rounded-xl overflow-hidden bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3 className="font-semibold text-gray-900 mb-1 truncate text-sm md:text-base">
                {product.name}
              </h3>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div>
                <p className="font-bold text-gray-900 text-base md:text-lg">
                  ${product.price}
                </p>
                <p className="text-xs text-gray-400">{product.weight}</p>
              </div>
              <button className="p-2 bg-gray-100 text-gray-900 rounded-full hover:bg-orange-500 hover:text-white transition-colors">
                <Plus size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
