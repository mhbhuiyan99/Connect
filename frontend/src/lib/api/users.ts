import { config } from "../config";
import api from "../axios";

export async function getAllUsers() {
  const res = await fetch(`${config.apiBaseUrl}/v1/users/list?page=1&limit=100`, {
    credentials: "include",
  });
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    return [];
  }
}

export async function getMe() {
  const res = await api.get("/v1/users/me");
  return res.data;
}
