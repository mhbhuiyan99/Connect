import { apiRequest } from "../../api-client";
import Alumni from "@/models/Alumni";

interface AlumniListResponse {
  items: Alumni[];
  limit: number;
  page: number;
  total: number;
  max_page: number;
  has_next: boolean;
}

export async function getAlumniList(page: number, limit: number): Promise<AlumniListResponse> {
  return await apiRequest<AlumniListResponse>(`/v1/alumni/search?query=&filter_by=all&page=${page}&limit=${limit}`);
}

export async function deleteAlumni(alumniId: string) {
  return await apiRequest(`/v1/alumni/${alumniId}`, { method: "DELETE" });
}
