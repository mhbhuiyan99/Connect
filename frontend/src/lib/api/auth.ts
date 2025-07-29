import api from "../axios";

export async function getProfile() {
  const res = await api.get("/v1/users/me");
  return res.data;
}

export async function refreshToken() {
  return await api.post("/v1/auth/refresh-token");
}

export async function signOut() {
  return await api.post("/v1/auth/sign-out");
}
