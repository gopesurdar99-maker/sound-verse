"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, UserCircle2, Package } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

export default function NavbarAuth() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-blue-400/40"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="btn-primary rounded-full px-4 py-2 text-sm font-medium"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/orders"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-blue-400/40"
        title="My Orders"
      >
        <Package className="h-5 w-5" />
      </Link>

      <Link
        href="/profile"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-blue-400/40"
        title="Profile"
      >
        <UserCircle2 className="h-5 w-5" />
      </Link>

      <button
        onClick={handleLogout}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-red-400/40"
        title="Logout"
      >
        <LogOut className="h-5 w-5" />
      </button>
    </div>
  );
}
