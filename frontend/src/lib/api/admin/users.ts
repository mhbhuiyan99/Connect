import { apiRequest } from "../../api-client";
import User from "@/models/User";
interface UserListResponse {
  items: User[];
  limit: number;
  page: number;
  total: number;
  max_page: number;
  has_next: boolean;
}

export async function getAdminUsers(page: number, limit: number): Promise<UserListResponse> {
  return await apiRequest<UserListResponse>(`/v1/users/list?page=${page}&limit=${limit}`);
}

export async function promoteUser(userId: string) {
  return await apiRequest(`/v1/admin/promote`, {
    method: "POST",
    body: JSON.stringify({ user_id: userId }),
  });
}

export async function demoteUser(userId: string) {
  return await apiRequest(`/v1/admin/demote`, {
    method: "POST",
    body: JSON.stringify({ user_id: userId }),
  });
}
