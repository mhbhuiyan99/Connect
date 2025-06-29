"use client";

import { notFound } from "next/navigation";
import ProfileCard from "@/components/ProfileCard";
import { useAuthStore } from "@/store/authStore";
import { config } from "@/lib/config";
import { useEffect, useState } from "react";
import { User } from "@/store/authStore"
import Alumni from "@/models/Alumni";

export default function ProfilePage() {
    const user = useAuthStore((state) => state.user);
    const [alumni, setAlumni] = useState<Alumni>(
        {
            student_id: "",
            batch: 1,
            name: "",
            email: "",
            linked_in: "",
            facebook: "",
            github: "",
            profile_photo: "/default-avatar.png",
            skills: [],
            industries: [],
            role: "alumni",
            sorting_order: 0,
            approved: true,
            id: ""
        }
    );
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getUserById(id: string) {
            if (!id) throw new Error("User ID is required");

            const res = await fetch(`${config.apiBaseUrl}/v1/alumni/student/${id}`, {
                cache: "no-store",
            });

            if (!res.ok) throw new Error("Failed to fetch alumni data");
            return res.json();
        }

        getUserById(user?.student_id ?? "")
            .then((data) => setAlumni(data))
            .catch(() => console.error)
            .finally(() => setIsLoading(false));
    }, []);
    if (!user) {
        return notFound();
    }

    if (isLoading) {
        return (
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Alumni Profile</h1>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Alumni Profile</h1>
            <ProfileCard {...alumni} />
        </div>
    );
}
