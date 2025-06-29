import { config } from "../config";

export async function getAllAlumni() {
    const res = await fetch(
        `${config.apiBaseUrl}/v1/alumni/search?query=&filter_by=all&page=1&limit=100`
    );
    const data = await res.json();
    if (res.ok) {
        return data.items;
    } else {
        return [];
    }
}