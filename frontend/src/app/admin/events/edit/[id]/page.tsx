"use client";

import { useParams } from "next/navigation";
import EventForm from "@/components/admin/EventForm"; 

export default function AdminEventEditPage() {
  let { id } = useParams();
  if (id instanceof Array) id = id[0];

  return <EventForm eventId={id} />;
}
