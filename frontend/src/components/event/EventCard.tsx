import { CalendarDays, MapPin } from "lucide-react";
import Event from "@/models/Event";
import Image from "next/image";

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="border rounded-2xl p-6 bg-white shadow-md hover:shadow-lg transition space-y-4">
      {event.photo && (
        <Image
          src={event.photo}
          alt={event.title}
          height={100}
          width={100}
          className="w-full h-60 object-cover rounded-xl"
        />
      )}

      <h2 className="text-2xl font-semibold">{event.title}</h2>

      <div className="flex items-center text-sm text-gray-600">
        <CalendarDays className="h-4 w-4 mr-2" />
        {new Date(event.date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>

      <div className="flex items-center text-sm text-gray-600">
        <MapPin className="h-4 w-4 mr-2" />
        {event.location}
      </div>

      <p className="text-gray-700">{event.description}</p>
    </div>
  );
}
