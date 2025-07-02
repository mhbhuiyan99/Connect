"use client";

import EventCard from "./EventCard";  // adjust path if needed

type Event = {
  _id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  photo?: string;
};

export default function EventList({ events }: { events: Event[] }) {
  return (
    <div className="space-y-6">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}
