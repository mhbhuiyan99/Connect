import { useSuspenseQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api-client";
import Event from "@/models/Event";

interface EventListResponse {
  upcoming: Event[];
  previous: Event[];
}

export function useEventList() {
  return useSuspenseQuery({
    queryKey: ["eventsList"],
    queryFn: () => apiRequest<EventListResponse>(`/v1/events/list`),
  });
}

interface AdminEventListResponse {
  items: Event[];
  total: number;
  limit: number;
  page: number;
  max_page: number;
  has_next: boolean;
}

export function useAdminEventList(page: number, limit: number) {
  return useSuspenseQuery({
    queryKey: ["adminEvents", page, limit],
    queryFn: () => apiRequest<AdminEventListResponse>(`/v1/events?page=${page}&limit=${limit}`),
  });
}
