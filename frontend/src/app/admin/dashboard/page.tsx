"use client";

import { useEffect, useState } from "react";
import { getAdminDashboardInfo } from "./request";

export default function AdminDashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    total_alumni: 0,
    pending_verifications: 0,
    notice_published: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminDashboardInfo()
      .then(setDashboardData)
      .finally(() => setLoading(false))
      .catch(console.error);
  }, []);

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Welcome Admin 👋</h1>
      {loading && <div>Loading...</div>}
      {!loading && !dashboardData && <div>Error loading dashboard data</div>}
      {!loading && dashboardData && (
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded shadow">Total Alumni: {dashboardData.total_alumni}</div>
          <div className="p-4 bg-white rounded shadow">
            Pending Verifications: {dashboardData.pending_verifications}
          </div>
          <div className="p-4 bg-white rounded shadow">Notice Published: {dashboardData.notice_published}</div>
        </div>
      )}
    </>
  );
}
