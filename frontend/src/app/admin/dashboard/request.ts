import { config } from "@/lib/config";

export async function getAdminDashboardInfo() {
  const res = await fetch(`${config.apiBaseUrl}/v1/admin/dashboard`, { credentials: "include" });

  if (!res.ok) {
    throw new Error("Failed to fetch alumni data");
  }

  return res.json();
}
