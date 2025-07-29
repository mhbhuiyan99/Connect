import { apiRequest } from "../api-client";
import Event from "@/models/Event";

export async function getEvents(): Promise<Event[]> {
  const data = await apiRequest<{ items: Event[] }>("/v1/events");
  return data.items;
}

export async function getEventsList(): Promise<{ upcoming: Event[]; previous: Event[] }> {
  return await apiRequest("/v1/events/list");
}
