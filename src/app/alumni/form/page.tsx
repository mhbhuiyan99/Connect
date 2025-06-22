"use client";
import AlumniInfoForm from "@/components/form/AlumniInfoForm";
import { useAuth } from "@/providers/AuthProvider";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { ImSpinner2 } from "react-icons/im";

export default function AlumniInfoPage() {
  // const { session, loading } = useAuth();

  // useEffect(() => {
  //   if (!session && !loading) {
  //     redirect("/");
  //   }
  // }, [session, loading]);

  // if (loading || !session) {
  //   return (
  //     <div className="p-6">
  //       <div className="flex justify-center items-center py-20">
  //         <ImSpinner2 className="animate-spin text-blue-500 text-4xl" />
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="w-full">
      <AlumniInfoForm />
    </div>
  );
}