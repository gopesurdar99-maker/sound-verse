"use client";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return (
      <main>
        <Navbar />
        <section className="container-width py-20">
          <h1 className="text-4xl font-semibold text-white">Profile</h1>
          <p className="mt-4 text-zinc-400">Please login to view your profile.</p>
          <Link
            href="/login"
            className="btn-primary mt-6 inline-block rounded-full px-6 py-3 text-sm font-medium"
          >
            Login
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <section className="py-16 md:py-20">
        <div className="container-width max-w-3xl">
          <div className="glass rounded-[32px] p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              My Account
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-white">Profile</h1>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-zinc-500">Name</p>
                <p className="mt-2 text-lg font-medium text-white">{user.name}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-zinc-500">Email</p>
                <p className="mt-2 text-lg font-medium text-white">{user.email}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-zinc-500">Role</p>
                <p className="mt-2 text-lg font-medium capitalize text-white">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
