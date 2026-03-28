import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type AuthStore = {
  token: string | null;
  user: AuthUser | null;
  setAuth: (token: string, user: AuthUser) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,

      setAuth: (token, user) => set({ token, user }),

      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "soundverse-auth",
    }
  )
);
