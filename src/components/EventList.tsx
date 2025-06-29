// components/EventList.tsx
"use client";

import EventCard from "./EventCard";

type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
};

export default function EventList({ events }: { events: Event[] }) {
  return (
    <div className="space-y-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
