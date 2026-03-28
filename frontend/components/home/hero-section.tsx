"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Headphones, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="hero-glow left-[10%] top-16" />
      <div className="hero-glow bottom-0 right-[12%]" />

      <div className="container-width grid items-center gap-16 md:grid-cols-2 lg:gap-20">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300"
          >
            <Sparkles className="h-4 w-4 text-cyan-400" />
            Premium headphone marketplace
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="max-w-xl text-5xl font-semibold leading-tight md:text-6xl"
          >
            Experience sound
            <span className="text-gradient"> without compromise</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="mt-6 max-w-lg text-base leading-7 text-zinc-400 md:text-lg"
          >
            Discover premium wired and wireless headphones crafted for music,
            gaming, calls, and immersive everyday listening.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/products?category=Wireless"
              className="btn-primary rounded-full px-6 py-3 text-sm font-medium"
            >
              Shop Wireless
            </Link>
            <Link
              href="/products?category=Wired"
              className="btn-secondary rounded-full px-6 py-3 text-sm font-medium"
            >
              Explore Wired
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-8 text-sm text-zinc-400"
          >
            <div>
              <p className="text-2xl font-semibold text-white">10+</p>
              <p>Curated audio picks</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">4.5★</p>
              <p>Average product rating</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">24/7</p>
              <p>Shopping-ready experience</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15 }}
          className="relative"
        >
          <div className="glass relative mx-auto h-[420px] w-full max-w-[520px] overflow-hidden rounded-[32px] p-6 md:p-8 shadow-2xl">
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10" />

            <div className="relative z-10 flex h-full items-center justify-center px-10 py-12">
              <div className="h-[300px] w-full max-w-[340px] overflow-hidden rounded-[28px] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80"
                  alt="Premium headphones"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/fallback-headphone.png";
                  }}
                />
              </div>
            </div>

            <div className="absolute left-6 top-6 z-20 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">
                Featured
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                Sony WH-CH720N
              </p>
            </div>

            <div className="absolute bottom-6 right-6 z-20 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <Headphones className="h-4 w-4 text-cyan-400" />
                <p className="text-sm font-medium text-white">Wireless ANC</p>
              </div>
              <p className="mt-1 text-xs text-zinc-400">Immersive all-day audio</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
