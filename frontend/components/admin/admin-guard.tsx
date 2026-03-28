"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) {
    return null; // redirect in progress
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
