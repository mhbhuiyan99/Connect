"use client";

import AboutSection from "@/components/about/AboutSection";
import HeroSection from "@/components/HeroSection";
import NoticeBoard from "@/components/NoticeBoard";

export default function Home() {
  return (
    <div className="space-y-16">
      <HeroSection />

      <div className="flex flex-col lg:flex-row gap-6">
        <main className="flex-1 space-y-16">
          <section className="bg-white rounded-xl p-6 shadow-md">
            <AboutSection />
          </section>

          <NoticeBoard />
        </main>
      </div>
    </div>
  );
}
