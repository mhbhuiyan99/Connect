import { config } from "../config";

export async function getAllUsers(accessToken: string) {
  const res = await fetch(`${config.apiBaseUrl}/v1/users/list?page=1&limit=100`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    return [];
  }
}
