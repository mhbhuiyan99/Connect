function getEnv(key: string, fallback?: string): string {
    const val = process.env[key];
    if (!val && fallback === undefined) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return val ?? fallback!;
}

export const config = {
    apiBaseUrl: getEnv("NEXT_PUBLIC_API_BASE_URL", "http://localhost:8000"),
    appName: getEnv("NEXT_PUBLIC_APP_NAME", "MBSTU Alumni Portal"),
};
