"use client";

import { useEffect, useState } from "react";
import EventList from "@/components/EventList";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  async function fetchEvents() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/events`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setEvents(data.items || []);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }
  fetchEvents();
}, []);


  if (loading) return <div className="text-center mt-8">Loading events...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Alumni Events</h1>
      <EventList events={events} />
    </div>
  );
}
