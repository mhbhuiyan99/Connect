import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api-client";
import Notice from "@/models/Notice";

interface NoticeListResponse {
  items: Notice[];
  limit: number;
  page: number;
  total: number;
  max_page: number;
  has_next: boolean;
}

export function useNotices(page: number, limit = 10) {
  return useQuery({
    queryKey: ["notices", page, limit],
    queryFn: () => apiRequest<NoticeListResponse>(`/v1/notice?page=${page}&limit=${limit}`),
  });
}

export function useAdminNotices(page: number, limit = 10) {
  return useSuspenseQuery({
    queryKey: ["adminNotices", page, limit],
    queryFn: () => apiRequest<NoticeListResponse>(`/v1/notice?page=${page}&limit=${limit}`),
  });
}
