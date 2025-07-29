import { config } from "@/lib/config";
import { apiRequest } from "../api-client";
import Notice from "@/models/Notice";

export async function getAdminNotices(id: string) {
  const res = await fetch(`${config.apiBaseUrl}/v1/alumni/${id}`, { credentials: "include" });

  if (!res.ok) {
    throw new Error("Failed to fetch alumni data");
  }

  return res.json();
}

export async function fetchNotices(pageNumber: number, limit: number = 10) {
  const res = await fetch(`${config.apiBaseUrl}/v1/notice?page=${pageNumber}&limit=${limit}`, {
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export async function createNotice(title: string, content: string, image_url: string) {
  return await apiRequest<Notice>(`/v1/notice`, {
    method: "POST",
    body: JSON.stringify({ title, content, image_url }),
  });
}

export async function updateNotice(noticeId: string, title: string, content: string, image_url: string) {
  return await apiRequest<Notice>(`/v1/notice/${noticeId}`, {
    method: "PUT",
    body: JSON.stringify({ title, content, image_url }),
  });
}

export async function getNoticeById(noticeId: string) {
  return await apiRequest<Notice>(`/v1/notice/${noticeId}`, { method: "GET" });
}
