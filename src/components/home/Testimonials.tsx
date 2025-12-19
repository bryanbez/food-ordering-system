"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Foodie",
    content:
      "The best burger I've ever had! The delivery was super fast and the packaging kept everything fresh.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Regular Customer",
    content:
      "I love the variety of rice meals. The teriyaki beef is my absolute favorite. Highly recommended!",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Chef",
    content:
      "As a chef myself, I appreciate the quality of ingredients they use. You can really taste the difference.",
    rating: 4,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop",
  },
];

export default function Testimonials() {
  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        What Our Customers Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
            <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-orange-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-1 mb-3 text-orange-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < testimonial.rating ? "currentColor" : "none"}
                  strokeWidth={i < testimonial.rating ? 0 : 2}
                />
              ))}
            </div>

            <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>

            <div>
              <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
              <p className="text-sm text-gray-400">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
