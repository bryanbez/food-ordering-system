"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Super Deals",
    subtitle: "Up to 50% off on all burgers",
    color: "bg-orange-500",
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Try our new spicy chicken wings",
    color: "bg-red-500",
  },
  {
    id: 3,
    title: "Family Feast",
    subtitle: "Perfect meals for the whole family",
    color: "bg-green-500",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((curr) => (curr + 1) % slides.length);
  const prev = () =>
    setCurrent((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

  return (
    <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg group">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          } ${slide.color}`}>
          {/* Placeholder Image Area */}
          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">
              {slide.title}
            </h2>
            <p className="text-xl md:text-2xl font-medium drop-shadow-sm">
              {slide.subtitle}
            </p>
            <button className="mt-8 px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-md">
              Order Now
            </button>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition-all opacity-0 group-hover:opacity-100">
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition-all opacity-0 group-hover:opacity-100">
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "w-6 bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
