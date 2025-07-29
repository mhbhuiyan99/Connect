import { useSuspenseQuery } from "@tanstack/react-query";
import { getAdminUsers } from "@/lib/api/admin/users";
import { getAlumniList } from "@/lib/api/admin/alumni";

export function useAdminUsersList(page: number, limit: number) {
  return useSuspenseQuery({
    queryKey: ["adminUsers", page, limit],
    queryFn: () => getAdminUsers(page, limit),
  });
}

export function useAdminAlumniList(page: number, limit: number) {
  return useSuspenseQuery({
    queryKey: ["adminAlumni", page, limit],
    queryFn: () => getAlumniList(page, limit),
  });
}
