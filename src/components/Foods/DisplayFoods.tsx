"use client";

import { useState } from "react";
import { Plus, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import useCategories from "@/app/hooks/useCategories";
import useFoods from "@/app/hooks/useFoods";
import { checkFoodCategoryHasItem } from "@/app/lib/utils/checkFoodCategoryHasItem";

interface DisplayFoodsProps {
  limit?: number;
  layout?: "grid" | "slider";
  userId?: string;
}

export default function DisplayFoods({
  limit,
  layout = "grid",
}: DisplayFoodsProps) {
  const { categories } = useCategories();
  const { foods } = useFoods();

  const [activeTab, setActiveTab] = useState<string>(
    categories?.[0]?.sku || "burgers"
  );
  const [erroredImages, setErroredImages] = useState<Record<string, boolean>>(
    {}
  );

  const handleImageError = (id: string) => {
    setErroredImages((prev) => ({ ...prev, [id]: true }));
  };

  const filteredCategories = checkFoodCategoryHasItem(foods, categories);

  return (
    <div className="py-8">
      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {filteredCategories
          ?.filter((category) => category.isAvailable)
          .map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.sku)}
              className={`px-6 py-2 cursor-pointer border border-gray-200 rounded-full whitespace-nowrap transition-all font-medium 
             ${
               activeTab === category.sku
                 ? "bg-orange-500 text-white shadow-md"
                 : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
             } `}>
              {category.name}
            </button>
          ))}
      </div>

      {/* Product Grid or Slider */}
      <div
        className={
          layout === "slider"
            ? "flex overflow-x-auto gap-6 pb-6 scrollbar-hide snap-x snap-mandatory"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        }>
        {foods
          .filter((food) => (activeTab ? food.category === activeTab : true))
          .filter((food) => food.isAvailable)
          .slice(0, limit ? limit : undefined)
          .map((food, index) => (
            <Link
              key={index}
              href={`/food/${food.id}`}
              className={`bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative flex flex-col justify-between ${
                layout === "slider" ? "min-w-[280px] w-[280px] snap-start" : ""
              }`}>
              {/* Wishlist Button */}
              <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors z-10">
                <Heart size={18} />
              </button>

              <div>
                {/* Image Container */}
                <div className="relative aspect-square mb-4 rounded-xl overflow-hidden bg-gray-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      erroredImages[food.id]
                        ? "/foodplaceholder.png"
                        : food.image || "/foodplaceholder.png"
                    }
                    onError={() => handleImageError(food.id)}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="font-semibold text-gray-900 mb-1 truncate">
                  {food.name}
                </h3>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div>
                  <p className="font-bold text-gray-900">${food.price}</p>
                </div>
                <button className="p-2 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-500 hover:text-white transition-colors">
                  <Plus size={20} />
                </button>
              </div>
            </Link>
          ))}

        {limit && (
          <Link
            href="/foods"
            className={`group flex flex-col items-center justify-center min-h-[300px] bg-orange-50 rounded-2xl border-2 border-dashed border-orange-200 hover:border-orange-500 hover:bg-orange-100 transition-all cursor-pointer text-center p-6 ${
              layout === "slider" ? "min-w-[280px] w-[280px] snap-start" : ""
            }`}>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
              <ArrowRight className="text-orange-500" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">View All</h3>
            <p className="text-gray-500 font-medium">
              See all delicious options
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}
