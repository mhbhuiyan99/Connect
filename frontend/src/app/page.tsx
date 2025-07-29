"use server";

import AboutSection from "@/components/about/AboutSection";
import EventHome from "@/components/EventHomeRotate";
import HeroSection from "@/components/HeroSection";
import NoticeBoard from "@/components/notice/NoticeBoard";
import { getEventsList } from "@/lib/api/events";
import Event from "@/models/Event";
import { Suspense } from "react";

export default async function Home() {
  let upcomingEvents: Event[] = [];
  try {
    const data = await getEventsList();
    upcomingEvents = data.upcoming || [];
  } catch (err) {
    console.error("Failed to load events", err);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <div className="flex flex-col lg:flex-row gap-6">
        <main className="flex-1 space-y-16">
          <section className="bg-white rounded-xl p-6 shadow-md">
            <AboutSection />
          </section>
          <Suspense fallback={<div>Loading...</div>}>
            <EventHome events={upcomingEvents} />
            <NoticeBoard />
            
          </Suspense>
        </main>
      </div>
    </div>
  );
}
