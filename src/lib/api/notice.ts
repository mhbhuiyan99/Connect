import { config } from "@/lib/config";

export async function getAdminNotices(id: string) {
    const res = await fetch(`${config.apiBaseUrl}/v1/alumni/${id}`);

    if (!res.ok) {
        throw new Error("Failed to fetch alumni data");
    }

    return res.json();
}

export async function fetchNotices(pageNumber: number, limit: number = 10) {
    const res = await fetch(`${config.apiBaseUrl}/v1/notice/?page=${pageNumber}&limit=${limit}`);
    const data = await res.json();
    return data;
}
