"use client";

import DisplayFoods from "@/components/Foods/DisplayFoods";

export default function FoodsPage() {
  return (
    <div className="w-[90%] mx-auto py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Explore Foods</h1>
      <DisplayFoods />
    </div>
  );
}
