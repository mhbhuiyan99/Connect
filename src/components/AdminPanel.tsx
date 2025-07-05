"use client";

import { useState } from "react";
import UserApproval from "./UserApproval"; // <- Reused for User Approval

const menuItems = [
  { id: "userapproval", label: "User Approval" },
  { id: "noticeedit", label: "Notice" },
  { id: "formedit", label: "Form Edit" },
  { id: "adminapproval", label: "Admin Approval" },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("userapproval");

  const renderContent = () => {
    switch (activeTab) {
      case "userapproval":
        return <UserApproval />;
      case "noticeedit":
        return <div>Notice Edit form goes here.</div>;
      case "formedit":
        return <div>Form Edit interface goes here.</div>;
      case "adminapproval":
        return <div>Admin Approval section goes here.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold text-center mb-6">Admin Panel</h2>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-4 py-2 rounded-md hover:bg-gray-200 transition ${
                  activeTab === item.id ? "bg-gray-300 font-semibold" : ""
                }`}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4 capitalize">
          {menuItems.find((item) => item.id === activeTab)?.label}
        </h1>
        <div className="bg-white p-6 rounded-lg shadow">{renderContent()}</div>
      </div>
    </div>
  );
}
