"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();

  const router = useRouter();

  if (user) {
    return router.push("/");
  }

  return <div className="p-10 rounded-md">{children}</div>;
}
