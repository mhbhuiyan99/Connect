"use client";
import { useEffect, useState } from "react";
import { getAllAlumni } from "@/lib/api/alumni";
import DotMenu from "./DotMenu";

export default function AlumniTable() {
    const [alumni, setAlumni] = useState([]);

    useEffect(() => {
        getAllAlumni().then(setAlumni).catch(console.error);
    }, []);

    return (
        <table className="w-full bg-white rounded shadow overflow-hidden">
            <thead>
                <tr className="bg-gray-200 text-left">
                    <th className="p-3">Name</th>
                    <th className="p-3">Batch</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {alumni.map((a: any) => (
                    <tr key={a.id} className="border-t">
                        <td className="p-3">{a.name}</td>
                        <td className="p-3">{a.batch}</td>
                        <td className="p-3">{a.email}</td>
                        <td className="p-3 text-right">
                            <DotMenu
                                onEdit={() => console.log("Edit", a.id)}
                                onDelete={() => console.log("Delete", a.id)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
