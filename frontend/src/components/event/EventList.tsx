import EventCard from "./EventCard";
import Event from "@/models/Event";

export default function EventList({
  previosEvents,
  upcomingEvents,
}: {
  previosEvents: Event[];
  upcomingEvents: Event[];
}) {
  return (
    <div className="space-y-16">
      {upcomingEvents.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-green-700">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}
          </div>
        </div>
      )}

      {previosEvents.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-orange-700">Past Events</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {previosEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
