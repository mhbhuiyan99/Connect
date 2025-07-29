import { apiRequest } from "@/lib/api-client";

export async function deleteNotice(noticeId: string) {
  return await apiRequest(`/v1/notice/${noticeId}`, { method: "DELETE" });
}
