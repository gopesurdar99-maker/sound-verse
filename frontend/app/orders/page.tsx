"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { fetchMyOrders } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import OrderStatusBadge from "@/components/shared/order-status-badge";
import ProductImage from "@/components/shared/product-image";

export default function OrdersPage() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const load = async () => {
      try {
        const data = await fetchMyOrders(token!);
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user, token, router]);

  return (
    <main>
      <Navbar />

      <section className="py-16 md:py-20">
        <div className="container-width max-w-5xl">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              My Orders
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">
              Order History
            </h1>
            <p className="mt-4 text-zinc-400">
              Track all your previous SoundVerse purchases in one place.
            </p>
          </div>

          {loading ? (
            <p className="text-zinc-400">Loading orders...</p>
          ) : orders.length === 0 ? (
            <div className="glass rounded-[28px] p-8">
              <p className="text-zinc-400">No orders yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const items = JSON.parse(order.items_json || "[]");

                return (
                  <div
                    key={order.order_code}
                    className="glass rounded-[28px] p-6"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-lg font-semibold text-white">
                          Order #{order.order_code}
                        </p>
                        <p className="mt-1 text-sm text-zinc-400">
                          Payment Ref: {order.payment_reference}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <OrderStatusBadge status={order.order_status} />
                        <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs text-blue-300">
                          {order.payment_method}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-sm text-zinc-500">Total</p>
                        <p className="mt-1 font-medium text-white">
                          {formatPrice(order.total_amount)}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-sm text-zinc-500">Payment Status</p>
                        <p className="mt-1 font-medium text-white">
                          {order.payment_status}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-sm text-zinc-500">Items</p>
                        <p className="mt-1 font-medium text-white">
                          {items.length} product{items.length > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h2 className="text-lg font-medium text-white">
                        Products in this order
                      </h2>

                      <div className="mt-4 space-y-3">
                        {items.map((item: any) => (
                          <div
                            key={`${order.order_code}-${item.id}`}
                            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                          >
                            <div className="relative h-16 w-16 overflow-hidden rounded-xl">
                              <ProductImage
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="64px"
                                className="object-cover"
                              />
                            </div>

                            <div className="flex-1">
                              <p className="font-medium text-white">{item.name}</p>
                              <p className="text-sm text-zinc-400">
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

                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        href={`/orders/${order.order_code}`}
                        className="btn-secondary rounded-full px-5 py-2 text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
