import AdminLayout from "@/components/AdminLayout";
import AlumniTable from "@/components/AlumniTable";

export default function AlumniPage() {
    return (
        <AdminLayout>
            <h1 className="text-xl font-bold mb-4">All Alumni</h1>
            <AlumniTable />
        </AdminLayout>
    );
}
