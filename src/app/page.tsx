"use client"

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import { useAuth } from "@/providers/AuthProvider";


const Homepage = () => {
  return (
    <div className="space-y-16">
      <HeroSection />
      <div className="flex flex-col lg:flex-row gap-6">
        <main className="flex-1 space-y-16">
          <AboutSection />
        </main>
      </div>
      {/*
      <div className="hidden xl:block w-[20%]"> <LeftMenu type="home"/> </div>

      <div className="w-full lg:w-[70%] xl:w-[70%]">

          <div className="flex flex-col gap-5">
            <Feed/>
          </div>

      </div>

      <div className="hidden lg:block w-[20%]"> <RightMenu/> </div>
      
    */}

    </div>
  );
}

export default Homepage;
