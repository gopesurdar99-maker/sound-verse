"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "@/components/shared/logo";
import NavbarAuth from "@/components/layout/navbar-auth";
import { useCartStore } from "@/store/cart-store";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Wired", href: "/products?category=Wired" },
  { label: "Wireless", href: "/products?category=Wireless" },
  { label: "Smart Finder", href: "/smart-finder" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const cartItems = useCartStore((s) => s.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 border-b border-white/8 bg-black/30 backdrop-blur-xl"
    >
      <div className="container-width flex h-20 items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-zinc-300 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-blue-400/40"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-500 px-1 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <NavbarAuth />
        </div>
      </div>
    </motion.header>
  );
}
