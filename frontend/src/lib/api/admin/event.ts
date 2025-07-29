import { apiRequest } from "@/lib/api-client";

export async function deleteEvent(eventId: string) {
  return await apiRequest(`/v1/events/${eventId}`, { method: "DELETE" });
}
