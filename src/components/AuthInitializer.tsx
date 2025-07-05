"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AuthInitializer() {
  const { accessToken, fetchUser, refreshAccessToken } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      if (!accessToken) await refreshAccessToken();
      await fetchUser();
    };

    init();

    const interval = setInterval(() => {
      refreshAccessToken();
    }, 9 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
