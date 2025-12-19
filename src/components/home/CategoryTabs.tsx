"use client";

import { useState } from "react";
import { Plus, Heart } from "lucide-react";

// Mock data for products
const products = {
  burgers: [
    {
      id: 1,
      name: "Classic Cheeseburger",
      price: 8.99,
      weight: "250g",
      image:
        "https://plus.unsplash.com/premium_photo-1683619761468-b06992704398?q=80&w=1565&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder
    },
    {
      id: 2,
      name: "Spicy Chicken Burger",
      price: 9.99,
      weight: "280g",
      image:
        "https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Veggie Delight",
      price: 7.99,
      weight: "220g",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Double Beef",
      price: 12.99,
      weight: "400g",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1299&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
  fries: [
    {
      id: 5,
      name: "Crispy French Fries",
      price: 3.99,
      weight: "150g",
      image:
        "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 6,
      name: "Loaded Cheese Fries",
      price: 5.99,
      weight: "300g",
      image:
        "https://images.unsplash.com/photo-1585109649139-3668018951a7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
  rice: [
    {
      id: 7,
      name: "Grilled Chicken Rice",
      price: 10.99,
      weight: "400g",
      image:
        "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1313&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 8,
      name: "Beef Teriyaki Rice",
      price: 12.99,
      weight: "420g",
      image:
        "https://images.unsplash.com/photo-1552590635-27c2c2128abf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
};

const tabs = [
  { id: "burgers", label: "Burgers" },
  { id: "fries", label: "Fries" },
  { id: "rice", label: "Rice Meals" },
];

export default function CategoryTabs() {
  const [activeTab, setActiveTab] = useState<keyof typeof products>("burgers");

  return (
    <div className="py-8">
      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as keyof typeof products)}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all font-medium ${
              activeTab === tab.id
                ? "bg-orange-500 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products[activeTab].map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative flex flex-col justify-between">
            {/* Wishlist Button */}
            <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors z-10">
              <Heart size={18} />
            </button>

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

              <h3 className="font-semibold text-gray-900 mb-1 truncate">
                {product.name}
              </h3>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div>
                <p className="font-bold text-gray-900">${product.price}</p>
                <p className="text-xs text-gray-400">{product.weight}</p>
              </div>
              <button className="p-2 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-500 hover:text-white transition-colors">
                <Plus size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
