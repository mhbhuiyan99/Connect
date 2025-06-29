import { create } from "zustand";
import { persist } from "zustand/middleware";
import { zustandLocalStorage } from "@/lib/zustandLocalStorage";
import { config } from "@/lib/config";

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    profile_photo: string | null;
    student_id: string;
    batch: number;
    industries: {
        industry: string;
        position: string;
        responsibilities: string;
        platform: string;
    }[];
}

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
    authLoading: boolean;
    setAccessToken: (token: string | null) => void;
    setAuthLoading: (loading: boolean) => void;
    setRefreshToken: (token: string | null) => void;
    setUser: (user: User | null) => void;
    logout: () => void;
    refreshAccessToken: () => Promise<void>;
    fetchUser: () => Promise<void>;
    autoRefresh: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            accessToken: null,
            refreshToken: null,
            user: null,
            authLoading: true,

            setAuthLoading: (loading) => set({ authLoading: loading }),
            setAccessToken: (token) => set({ accessToken: token }),
            setRefreshToken: (token) => set({ refreshToken: token }),
            setUser: (user) => set({ user }),

            logout: () => { set({ accessToken: null, refreshToken: null, user: null }) },

            refreshAccessToken: async () => {
                try {
                    const refreshToken = get().refreshToken;
                    console.log("[auth] Refreshing access token...", refreshToken);
                    if (!refreshToken) {
                        get().logout();
                        return;
                    }

                    const res = await fetch(`${config.apiBaseUrl}/v1/auth/refresh-token`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ refresh_token: refreshToken }),
                    });

                    if (!res.ok) throw new Error("Refresh failed");

                    const data = await res.json();
                    set({ accessToken: data.access_token });

                    console.log("[auth] Access token refreshed");
                } catch (err) {
                    console.error("Auto-refresh failed:", err);
                    get().logout();
                } finally {
                    get().setAuthLoading(false);
                }
            },

            fetchUser: async () => {
                const { accessToken } = get();
                if (!accessToken) return;

                const res = await fetch(`${config.apiBaseUrl}/v1/users/me`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                if (!res.ok) throw new Error("User fetch failed");
                const user = await res.json();
                set({ user });
            },

            autoRefresh: async () => {
                setInterval(() => get().refreshAccessToken(), 9 * 60 * 1000);
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                user: state.user,
            }),
            storage: zustandLocalStorage,
        }
    )
);
