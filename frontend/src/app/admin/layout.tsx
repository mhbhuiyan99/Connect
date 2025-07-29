"use client";

import Sidebar from "@/components/Sidebar";
import { useAuthStore } from "@/store/authStore";
import { redirect } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  if (!user) return redirect("/sign-in");
  if (user.role !== "superadmin" && user.role !== "admin") return redirect("/sign-in");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
