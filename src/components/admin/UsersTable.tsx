"use client";
import { useEffect, useState } from "react";
import { getAllUsers } from "@/lib/api/users";
import { useAuthStore } from "@/store/authStore";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { config } from "@/lib/config";

export default function UsersTable() {
    const [users, setUsers] = useState([]);
    const { accessToken, authLoading, user } = useAuthStore();

    useEffect(() => {
        if (!accessToken) return;
        getAllUsers(accessToken).then(setUsers).catch(console.error);
    }, [authLoading]);

    const handlePromote = async (userId: number) => {
        if (user?.role !== "superadmin") {
            return toast.error("Only superadmin can promote users");
        }
        const req = await fetch(`${config.apiBaseUrl}/v1/admin/promote`, {
            method: "POST",
            body: JSON.stringify({ user_id: userId }),
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        })

        if (req.ok) {
            toast.success("User promoted successfully");
            getAllUsers(accessToken ? accessToken : "").then(setUsers).catch(console.error);
        } else {
            toast.error("Error promoting user!");
        }

    };

    const handleDemote = async (userId: number) => {
        if (user?.role !== "superadmin") {
            return toast.error("Only superadmin can demote users");
        }

        const req = await fetch(`${config.apiBaseUrl}/v1/admin/demote`, {
            method: "POST",
            body: JSON.stringify({ user_id: userId }),
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        })

        if (req.ok) {
            toast.success("User demoted successfully");
            getAllUsers(accessToken ? accessToken : "").then(setUsers).catch(console.error);
        } else {
            toast.error("Error demoting user!");
        }
    };

    return (
        <table className="w-full bg-white rounded shadow overflow-hidden">
            <thead>
                <tr className="bg-gray-200 text-left">
                    <th className="p-3">Name</th>
                    <th className="p-3">Student ID</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((a: any) => (
                    <tr key={a.id} className="border-t">
                        <td className="p-3">{a.name}</td>
                        <td className="p-3">{a.student_id}</td>
                        <td className="p-3">{a.email}</td>
                        <td className="p-3">{a.role}</td>
                        <td>
                            {(a.role === "alumni") ?
                                <Button variant={"outline"} onClick={() => handlePromote(a.id)} >Promote to Admin</Button>
                                : (<Button variant={"outline"} onClick={() => handleDemote(a.id)}>Demote to Alumni</Button>)
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
