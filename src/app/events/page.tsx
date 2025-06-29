// app/events/page.tsx
"use client";

import EventList from "@/components/EventList";

const dummyEvents = [
  {
    id: 1,
    title: "Alumni Homecoming 2025",
    date: "2025-08-10",
    location: "University Auditorium",
    description: "Join us for a day of memories, networking, and celebrations with fellow alumni.",
    photo: "/images/homecoming.jpg", // <- replace with your actual image path or URL
  },
  {
    id: 2,
    title: "Career Talk Series",
    date: "2025-09-15",
    location: "Online (Zoom)",
    description: "Industry leaders and alumni share their professional journeys and tips for success.",
    photo: "https://source.unsplash.com/800x400/?career,seminar", // demo image
  },
];

export default function EventsPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Alumni Events</h1>
      <EventList events={dummyEvents} />
    </div>
  );
}
