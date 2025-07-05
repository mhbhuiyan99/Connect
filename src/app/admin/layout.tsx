"use client";

import Sidebar from "@/components/Sidebar";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Check if the user is authenticated and has the admin role
  const { authLoading, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user?.role !== "superadmin" && user?.role !== "admin") {
      router.replace("/sign-in");
    }
  }, [authLoading, user, router]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
