"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import LoadingAnimation from "./LoadingAnimation";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { loading, getUserProfile: fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return <LoadingAnimation />;
  }

  return <>{children}</>;
}
