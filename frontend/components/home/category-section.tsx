"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Cable, Radio } from "lucide-react";

const categories = [
  {
    title: "Wired Collection",
    description: "Pure signal, zero latency, dependable performance.",
    href: "/products?category=Wired",
    icon: Cable,
  },
  {
    title: "Wireless Collection",
    description: "Freedom, comfort, and seamless everyday listening.",
    href: "/products?category=Wireless",
    icon: Radio,
  },
];

export default function CategorySection() {
  return (
    <section className="py-10 md:py-16">
      <div className="container-width">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              Categories
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
              Shop by sound style
            </h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={category.href}
                  className="card-hover glass group block rounded-[28px] p-8"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/6 text-white">
                    <Icon className="h-6 w-6 text-cyan-400" />
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold text-white">
                    {category.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-zinc-400">
                    {category.description}
                  </p>

                  <div className="mt-6 inline-flex items-center text-sm font-medium text-blue-400 transition group-hover:text-cyan-300">
                    Explore collection →
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
