import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getMe } from "@/lib/api/users";
import { signOut } from "@/lib/api/auth";
import User from "@/models/User";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  getUserProfile: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: true,

      getUserProfile: async () => {
        try {
          const user = await getMe();
          set({ user, isAuthenticated: true, loading: false });
        } catch {
          set({ user: null, isAuthenticated: false, loading: false });
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        await signOut();
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
