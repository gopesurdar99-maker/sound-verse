"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { fetchCurrentUser } from "@/lib/api";

export default function AuthValidator() {
  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    if (!token) return;

    // Validate the stored token is still accepted by the backend
    fetchCurrentUser(token).catch(() => {
      // Token is expired or invalid — clear the stale session
      logout();
    });
  }, [token, logout]);

  return null;
}
