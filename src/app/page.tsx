"use client";

import HeroSlider from "@/components/home/HeroSlider";
import CategoryTabs from "@/components/home/CategoryTabs";
import RecommendedProducts from "@/components/home/RecommendedProducts";
import Testimonials from "@/components/home/Testimonials";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <section>
          <HeroSlider />
        </section>

        {/* Categories & Menu */}
        <section>
          <CategoryTabs limit={4} layout="slider" />
        </section>

        {/* Recommended Products */}
        <section>
          <RecommendedProducts />
        </section>

        {/* Testimonials */}
        <section className="bg-gradient-to-br from-orange-50 to-white rounded-3xl p-4 sm:p-8">
          <Testimonials />
        </section>

        {/* Contact Us */}
        <section>
          <ContactSection />
        </section>
      </div>
    </div>
  );
}
