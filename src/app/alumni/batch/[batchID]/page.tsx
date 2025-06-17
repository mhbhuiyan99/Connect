"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AlumniCard, { Alumni } from "@/components/AlumniCard";
const sampleAlumni: Alumni = {
    name: "Hasibul Kabir",
    email: "hasibul@example.com",
    linked_in: "https://linkedin.com/in/hasibulkabir",
    facebook: "https://facebook.com/hasibulkabir",
    skills: ["JavaScript", "React", "Next.js"],
    photo: "/default-avatar.png", // fallback to default if empty
    student_id: "ce25003",
    batch: 0,
    current_industry: "Baper Hotel Pvt. Ltd.",
    job_title: "Software Engineer",
    role: "alumni",
    sorting_order: 25003
};


export default function BatchDetailsPage() {
    const { batchID } = useParams(); // For App Router
    const [alumni, setAlumni] = useState<Alumni[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAlumni = async () => {

            const res = await fetch(`http://127.0.0.1:8000/v1/alumni/?batch=${batchID}`);
            const data = await res.json();
            if (res.ok) {
                setAlumni(data.items);
            } else {
                setAlumni([]);
            }
            setLoading(false);
        };
        fetchAlumni();
    }, [batchID]);



    if (loading) {
        return <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Alumni from Batch {batchID}</h1>

        </div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Alumni from Batch {batchID}</h1>
            {/* render alumni cards like before */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {alumni.map((alum) => (
                    <AlumniCard key={alum.student_id + Math.random()} alumni={alum} />
                ))}
            </div>
        </div>
    );
}
