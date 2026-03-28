"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { loginUser, signupUser } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";

export default function SignupPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      await signupUser({
        name,
        email,
        password,
        role: "customer",
      });

      const loginData = await loginUser({ email, password });
      setAuth(loginData.access_token, loginData.user);
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <Navbar />

      <section className="py-16 md:py-20">
        <div className="container-width max-w-xl">
          <div className="glass rounded-[32px] p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              Join SoundVerse
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-white">Create Account</h1>
            <p className="mt-4 text-zinc-400">
              Sign up to save your details and continue shopping.
            </p>

            <form onSubmit={handleSignup} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm text-zinc-400">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  placeholder="Create a password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full rounded-full px-6 py-3 text-sm font-medium disabled:opacity-70"
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-6 text-sm text-zinc-400">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-400 hover:text-cyan-300">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
