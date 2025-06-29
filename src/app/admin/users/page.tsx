import AdminLayout from "@/components/AdminLayout";
import UserTable from "@/components/admin/UsersTable";

export default function AlumniPage() {
    return (
        <AdminLayout>
            <h1 className="text-xl font-bold mb-4">All Users</h1>
            <UserTable />
        </AdminLayout>
    );
}
