import Alumni from "@/models/Alumni";
import { apiRequest } from "../api-client";
import { config } from "../config";

export async function getAllAlumni() {
  const res = await fetch(`${config.apiBaseUrl}/v1/alumni/search?query=&filter_by=all&page=1&limit=100`, {
    credentials: "include",
  });
  const data = await res.json();
  if (res.ok) {
    return data.items;
  } else {
    return [];
  }
}

export async function getAlumniByID(id: string): Promise<Alumni> {
  return await apiRequest<Alumni>(`/v1/alumni/${id}`);
}

interface AlumniSearchResponse {
  items: Alumni[];
  limit: number;
  page: number;
  total: number;
  max_page: number;
  has_next: boolean;
}

export async function searchAlumni(
  query: string,
  filterBy: string,
  page: number = 1,
  limit: number = 100
): Promise<AlumniSearchResponse> {
  return await apiRequest<AlumniSearchResponse>(
    `/v1/alumni/search?query=${encodeURIComponent(query)}&filter_by=${filterBy}&page=${page}&limit=${limit}`
  );
}

export async function getAlumniByBatchID(batchID: string): Promise<AlumniSearchResponse> {
  return await apiRequest<AlumniSearchResponse>(`/v1/alumni/?batch=${batchID}`);
}
