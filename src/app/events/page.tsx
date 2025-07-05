"use client";

import { useEffect, useState } from "react";
import EventList from "@/components/EventList";
import { config } from "@/lib/config";

export default function EventsPage() {
  const [previousEvents, setPreviousEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchEvents() {
    try {
      const res = await fetch(`${config.apiBaseUrl}/v1/events/list`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setPreviousEvents(data.previous || []);
      setUpcomingEvents(data.upcoming || []);
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
  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading events...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Alumni Events</h1>
      <EventList
        previosEvents={previousEvents}
        upcomingEvents={upcomingEvents}
      />
    </div>
  );
}
