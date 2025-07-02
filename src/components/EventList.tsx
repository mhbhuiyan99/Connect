"use client";

import EventCard from "./EventCard";

type Event = {
  _id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  photo?: string;
};

export default function EventList({ events }: { events: Event[] }) {
  const now = new Date();

  const upcomingEvents = events.filter(
    (event) => new Date(event.date) >= now
  );

  const pastEvents = events.filter(
    (event) => new Date(event.date) < now
  );

  // Optional: sort both groups (newest first or last)
  upcomingEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  pastEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-12">
      {upcomingEvents.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-green-700">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </div>
      )}

      {pastEvents.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Past Events</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {pastEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
