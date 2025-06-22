"use client";

import React from "react";

type User = {
  id: string;
  name: string;
  batch: string;
  picture: string;
};

const dummyUser: User = {
  id: "12345",
  name: "matha nosto",
  batch: "Batch 222",
  picture: "https://randomuser.me/api/portraits/men/75.jpg",
};

export default function AdminApproval() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Approval</h1>

      <div className="flex items-center border rounded-lg p-4 shadow-md">
        <img
          src={dummyUser.picture}
          alt={dummyUser.name}
          className="w-24 h-24 rounded-full object-cover"
        />

        <div className="flex-1 ml-6">
          <p className="text-xl font-semibold">{dummyUser.name}</p>
          <p className="text-gray-600">ID: {dummyUser.id}</p>
          <p className="text-gray-600">{dummyUser.batch}</p>
        </div>

        <div className="flex flex-col gap-3 ml-6">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => alert(`Approved ${dummyUser.name}`)}
          >
            Approve
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            onClick={() => alert(`Denied ${dummyUser.name}`)}
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  );
}
