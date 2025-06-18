"use client";
import AlumniInfoForm from "@/components/form/AlumniInfoForm";
import { useAuth } from "@/providers/AuthProvider";
import { redirect } from "next/navigation";

export default function AlumniInfoPage() {
  const { session } = useAuth();
  if (!session) return redirect('/');

  return (
    <div className="w-full">
      <AlumniInfoForm />
    </div>
  );
}