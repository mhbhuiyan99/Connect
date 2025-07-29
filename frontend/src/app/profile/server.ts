import { config } from "@/lib/config";
import axios from "axios";
import { cookies } from "next/headers";

export async function getMyAlumniProfile() {
  const res = await axios.get(`${config.apiBaseUrl}/v1/alumni/student/me`, {
    headers: {
      Cookie: `session=${(await cookies()).get("session")?.value}`,
    },
  });
  return res.data;
}
