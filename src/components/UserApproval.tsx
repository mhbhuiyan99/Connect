"use client";

import { config } from "@/lib/config";
import Alumni from "@/models/Alumni";
import { useAuthStore } from "@/store/authStore";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  student_id: string;
  email: string;
  role: string;
  approved: boolean;
  bio: string;
  created_at: string;
  updated_at: string;
  profile_photo: string;
};



export default function UserApproval() {
  const [showFormApprovals, setShowFormApprovals] = useState(false);
  const [showUserApprovals, setShowUserApprovals] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken, authLoading } = useAuthStore();

  const [alumnis, setAlumnis] = useState<Alumni[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const getAlumnis = async (pageNumber: number, limit: number = 10) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${config.apiBaseUrl}/v1/auth/approve/alumni/pending?page=${pageNumber}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = await res.json();
      setAlumnis(data);
    } catch (err) {
      console.error("Error fetching Aliumni:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getUsers = async (pageNumber: number, limit: number = 10) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${config.apiBaseUrl}/v1/auth/approve/user/pending?page=${pageNumber}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching Users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    if (accessToken && !isLoading) {
      getAlumnis(1);
      getUsers(1);
    }
  }, [accessToken]);


  async function handleAlumniApprove(alumniId: string, status: boolean) {
    try {
      const res = await fetch(`${config.apiBaseUrl}/v1/auth/approve/alumni`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          "user_id": alumniId,
          "status": status,
        }),
      });
      if (res.ok) {
        getAlumnis(1);
        alert("Alumni approved successfully");
      }
    } catch (err) {
      console.error("Error approving Alumni:", err);
      toast.error("Error approving Alumni");
    }
  }

  async function handleApprove(alumniId: string, status: boolean) {
    try {
      const res = await fetch(`${config.apiBaseUrl}/v1/auth/approve/user`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          "user_id": alumniId,
          "status": status,
        }),
      });
      if (res.ok) {
        getUsers(1);
        alert("User approved successfully");
      }
    } catch (err) {
      console.error("Error approving User:", err);
      toast.error("Error approving Alumni");
    }
  }

  const renderApprovalAlumniCards = (users: Alumni[]) => (
    <div className="space-y-4 mt-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center border rounded-lg p-4 shadow-md"
        >
          <img
            src={user.profile_photo || "/default-avatar.png"}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex-1 ml-6">
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-gray-600">Student ID: {user.student_id}</p>
            <p className="text-gray-600">Batch: {user.batch}</p>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Role: {user.role}</p>
            <p className="text-gray-600">Current Industry: {user.industries[0]?.industry || ""}</p>
            <p className="text-gray-600">Job Title: {user.industries[0]?.position || ""}</p>
            {user.linked_in && <p className="text-gray-600">Linked In: {user.linked_in}</p>}
            {user.facebook && <p className="text-gray-600">Facebook: {user.facebook}</p>}
            <p className="text-gray-600">Skills: {user.skills.join(", ")}</p>
          </div>
          <div className="flex flex-col gap-2 ml-6">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => handleAlumniApprove(user.id, true)}
            >
              Approve
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              onClick={() => handleAlumniApprove(user.id, false)}
            >
              Deny
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderApprovalCards = (users: User[]) => (
    <div className="space-y-4 mt-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center border rounded-lg p-4 shadow-md"
        >
          <div className="flex-1 ml-6">
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-gray-600">Student ID: {user.student_id}</p>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Role: {user.role}</p>
            <p className="text-gray-600">Created At: {new Date(user.created_at).toLocaleString()}</p>
            <p className="text-gray-600">Updated At: {new Date(user.updated_at).toLocaleString()}</p>
          </div>
          <div className="flex flex-col gap-2 ml-6">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => handleApprove(user.id, true)}
            >
              Approve
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              onClick={() => handleApprove(user.id, false)}
            >
              Deny
            </button>
          </div>
        </div>
      ))}
    </div>
  );


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Approval</h1>

      {/* Alumni Form Approvals */}
      <div className="mb-6">
        <button
          onClick={() => setShowFormApprovals(!showFormApprovals)}
          className="w-full flex justify-between items-center bg-gray-200 px-4 py-3 rounded text-lg font-semibold hover:bg-gray-300 transition"
        >
          <span>Alumni Form Approvals</span>
          <span>{showFormApprovals ? "▲" : "▼"}</span>
        </button>
        {showFormApprovals && renderApprovalAlumniCards(alumnis)}
      </div>

      {/* Alumni User Approvals */}
      <div>
        <button
          onClick={() => setShowUserApprovals(!showUserApprovals)}
          className="w-full flex justify-between items-center bg-gray-200 px-4 py-3 rounded text-lg font-semibold hover:bg-gray-300 transition"
        >
          <span>Alumni User Approvals</span>
          <span>{showUserApprovals ? "▲" : "▼"}</span>
        </button>
        {showUserApprovals && renderApprovalCards(users)}
      </div>
    </div>
  );
}
