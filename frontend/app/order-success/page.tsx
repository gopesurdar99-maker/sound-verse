"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { fetchOrder } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import ProductImage from "@/components/shared/product-image";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderCode = searchParams.get("orderCode");

  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderCode) {
      setLoading(false);
      return;
    }

    if (!token) {
      return;
    }

    const loadOrder = async () => {
      try {
        const data = await fetchOrder(orderCode, token);
        setOrder(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderCode, token]);

  if (loading) {
    return (
      <section className="container-width py-20 text-zinc-400">
        Authenticating session and loading your receipt...
      </section>
    );
  }

  if (!order) {
    return (
      <section className="container-width py-20">
        <h1 className="text-4xl font-semibold text-white">Order not found</h1>
        <p className="mt-4 text-zinc-400">Missing or unauthorized order reference.</p>
        <Link
          href="/orders"
          className="btn-primary mt-6 inline-block rounded-full px-6 py-3 text-sm font-medium"
        >
          View My Orders
        </Link>
      </section>
    );
  }

  const items = JSON.parse(order.items_json || "[]");

  return (
    <section className="py-16 md:py-20">
      <div className="container-width max-w-4xl">
        <div className="glass rounded-[32px] p-8 md:p-10">
          <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
            Payment Successful
          </div>

          <h1 className="mt-5 text-4xl font-semibold text-white md:text-5xl">
            Your order is confirmed
          </h1>

          <p className="mt-4 text-zinc-400">
            Thank you for shopping with SoundVerse. Your payment was processed
            successfully and the order has been created in the system.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-zinc-500">Order Code</p>
              <p className="mt-1 font-medium text-white">{order.order_code}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-zinc-500">Payment Reference</p>
              <p className="mt-1 font-medium text-white">{order.payment_reference}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-zinc-500">Payment Method</p>
              <p className="mt-1 font-medium text-white">{order.payment_method}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-zinc-500">Total</p>
              <p className="mt-1 font-medium text-white">
                {formatPrice(order.total_amount)}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-zinc-500">Billing Name</p>
              <p className="mt-1 font-medium text-white">{order.billing_name}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-zinc-500">Shipping Address</p>
              <p className="mt-1 text-sm leading-7 text-zinc-300">
                {order.customer_name}
                <br />
                {order.customer_phone}
                <br />
                {order.customer_email}
                <br />
                {order.address_line_1}
                {order.address_line_2 ? `, ${order.address_line_2}` : ""}
                <br />
                {order.city}, {order.state} - {order.pincode}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-white">Items</h2>
            <div className="mt-4 space-y-4">
              {items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-xl">
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{item.name}</p>
                    <p className="mt-1 text-sm text-zinc-400">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-white">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/orders"
              className="btn-primary rounded-full px-6 py-3 text-sm font-medium"
            >
              View My Orders
            </Link>
            <Link
              href="/products"
              className="btn-secondary rounded-full px-6 py-3 text-sm font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function OrderSuccessPage() {
  return (
    <main>
      <Navbar />
      <Suspense fallback={<div className="container-width py-20 text-zinc-400">Gathering secure order block...</div>}>
        <OrderSuccessContent />
      </Suspense>
      <Footer />
    </main>
  );
}
