"use client";

import EventList from "@/components/event/EventList";
import { useEventList } from "@/hooks/useEvents";

export default function EventsPage() {
  const { data, isLoading } = useEventList();

  if (isLoading) return <div className="text-center mt-8 text-red-600">Loading...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Alumni Events</h1>
      <EventList
        previosEvents={data.previous}
        upcomingEvents={data.upcoming}
      />
    </div>
  );
}
