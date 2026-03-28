"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
        <h2 className="text-2xl font-semibold text-white">Admin access required</h2>
        <p className="mt-3 text-zinc-400">Please login as an admin to continue.</p>
        <Link
          href="/login"
          className="mt-6 inline-block rounded-xl bg-white px-5 py-3 text-sm font-medium text-black"
        >
          Login
        </Link>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-8">
        <h2 className="text-2xl font-semibold text-white">Access denied</h2>
        <p className="mt-3 text-zinc-300">
          This area is available only for admin users.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
