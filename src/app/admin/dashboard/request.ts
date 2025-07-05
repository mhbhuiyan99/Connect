import { config } from "@/lib/config";

export async function getAdminDashboardInfo(accessToken: string) {
  const res = await fetch(`${config.apiBaseUrl}/v1/admin/dashboard`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch alumni data");
  }

  return res.json();
}
