"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { formatPrice } from "@/lib/utils";
import { ShippingAddress, useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";

export default function CheckoutPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const cartItems = useCartStore((s) => s.items);
  const savedAddress = useCartStore((s) => s.shippingAddress);
  const setShippingAddress = useCartStore((s) => s.setShippingAddress);

  const [form, setForm] = useState<ShippingAddress>(
    savedAddress || {
      fullName: user?.name || "",
      phone: "",
      email: user?.email || "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
    }
  );

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );
  const shipping = cartItems.length > 0 ? 199 : 0;
  const total = subtotal + shipping;

  const handleChange = (key: keyof ShippingAddress, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleContinue = () => {
    const requiredFields: (keyof ShippingAddress)[] = [
      "fullName",
      "phone",
      "email",
      "addressLine1",
      "city",
      "state",
      "pincode",
    ];

    const hasEmpty = requiredFields.some((field) => !form[field].trim());

    if (hasEmpty) {
      alert("Please fill all required address fields.");
      return;
    }

    setShippingAddress(form);
    router.push("/payment");
  };

  if (!user) {
    return (
      <main>
        <Navbar />
        <section className="container-width py-20">
          <h1 className="text-4xl font-semibold text-white">Login Required</h1>
          <p className="mt-4 text-zinc-400">
            Please login to continue to checkout.
          </p>
          <Link
            href="/login"
            className="btn-primary mt-6 inline-block rounded-full px-6 py-3 text-sm font-medium"
          >
            Go to Login
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main>
        <Navbar />
        <section className="container-width py-20">
          <h1 className="text-4xl font-semibold text-white">Checkout</h1>
          <p className="mt-4 text-zinc-400">Your cart is empty.</p>
          <Link
            href="/products"
            className="btn-primary mt-6 inline-block rounded-full px-6 py-3 text-sm font-medium"
          >
            Shop Products
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
        <div className="container-width">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              Checkout
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">
              Delivery address
            </h1>
            <p className="mt-4 max-w-2xl text-zinc-400">
              Enter your delivery details before selecting a payment method.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="glass rounded-[28px] p-6 md:p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm text-zinc-400">Full Name</label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-400">Phone Number</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-400">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500"
                    placeholder="Enter email"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm text-zinc-400">Address Line 1</label>
                  <input
                    type="text"
                    value={form.addressLine1}
                    onChange={(e) => handleChange("addressLine1", e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500"
                    placeholder="House no, street, locality"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm text-zinc-400">Address Line 2</label>
                  <input
                    type="text"
                    value={form.addressLine2}
                    onChange={(e) => handleChange("addressLine2", e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500"
                    placeholder="Landmark, apartment, optional"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-400">City</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500"
                    placeholder="Enter city"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-400">State</label>
                  <input
                    type="text"
                    value={form.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500"
                    placeholder="Enter state"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-400">Pincode</label>
                  <input
                    type="text"
                    value={form.pincode}
                    onChange={(e) => handleChange("pincode", e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500"
                    placeholder="Enter pincode"
                  />
                </div>
              </div>
            </div>

            <div className="glass h-fit rounded-[28px] p-6">
              <h2 className="text-2xl font-semibold text-white">Order Summary</h2>

              <div className="mt-6 space-y-4">
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-white">{item.name}</p>
                        <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm text-zinc-300">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4 text-sm">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-zinc-400">
                    <span>Shipping</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-base font-semibold text-white">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  onClick={handleContinue}
                  className="btn-primary mt-4 w-full rounded-full px-6 py-3 text-sm font-medium"
                >
                  Continue to Payment
                </button>

                <Link
                  href="/cart"
                  className="btn-secondary block rounded-full px-6 py-3 text-center text-sm font-medium"
                >
                  Back to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
