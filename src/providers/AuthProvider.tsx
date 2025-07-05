"use client";
import { config } from "@/lib/config";
import User from "@/models/User";
import React, { createContext, useContext, useEffect, useState } from "react";

interface Session {
  accessToken: string;
  expiresAt: number; // timestamp in ms
}

const AuthContext = createContext<{
  session: Session | null;
  setSession: (session: Session | null) => void;
  isAuthLoading: boolean;
  user: User | null;
}>({
  session: null,
  setSession: () => {},
  isAuthLoading: true,
  user: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      // if (!refreshToken) throw new Error('Missing refresh token');
      if (!refreshToken) return;
      // console.log("Provider Refresh Token: ", refreshToken);

      const res = await fetch(`${config.apiBaseUrl}/v1/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!res.ok) throw new Error("Failed to refresh token");

      const data = await res.json();
      const newExpiresAt = Date.now() + 1800 * 1000;

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("expires_at", newExpiresAt.toString());

      setSession({
        accessToken: data.access_token,
        expiresAt: newExpiresAt,
      });

      console.log("[auth] Access token refreshed");
    } catch (err) {
      console.error("[auth] Token refresh failed:", err);
      setSession(null);
      // localStorage.removeItem('access_token');
      // localStorage.removeItem('expires_at');
      // localStorage.removeItem('refresh_token');
    } finally {
      setLoading(false);
    }
  };

  // Load from localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setUser(JSON.parse(user));
    loadAccessToken();
  }, []);

  // Auto refresh logic
  useEffect(() => {
    if (!session) return;

    const now = Date.now();
    const timeUntilExpiry = session.expiresAt - now;
    const refreshTime = timeUntilExpiry - 30_000; // 30 seconds before expiry

    if (refreshTime <= 0) return;

    const timeoutId = setTimeout(loadAccessToken, refreshTime);
    return () => clearTimeout(timeoutId);
  }, [session]);

  return (
    <AuthContext.Provider value={{ session, setSession, isAuthLoading: loading, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
