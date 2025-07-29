import UserTable from "@/components/admin/UsersTable";
import { Suspense } from "react";

export default function AdminListUserPage() {
  return (
    <>
      <h1 className="text-xl font-bold mb-4">All Users</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <UserTable />
      </Suspense>
    </>
  );
}
