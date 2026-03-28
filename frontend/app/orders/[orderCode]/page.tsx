"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { fetchSingleOrder, cancelMyOrder } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import OrderTrackingTimeline from "@/components/shared/order-tracking-timeline";
import { useAuthStore } from "@/store/auth-store";
import OrderStatusBadge from "@/components/shared/order-status-badge";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();

  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const orderCode = params.orderCode as string;

  useEffect(() => {
    if (!user || !token) {
      router.push("/login");
      return;
    }

    const loadOrder = async () => {
      try {
        const data = await fetchSingleOrder(token, orderCode);
        setOrder(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [user, token, orderCode, router]);

  const handleDownloadInvoice = () => {
    window.print();
  };

  const handleCancelOrder = async () => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    try {
      await cancelMyOrder(token!, orderCode);
      const data = await fetchSingleOrder(token!, orderCode);
      setOrder(data);
    } catch (e: any) {
      alert(e.message || "Failed to cancel order");
    }
  };

  if (!user) return null;

  return (
    <main>
      <Navbar />

      <section className="py-16 md:py-20 print:py-6">
        <div className="container-width max-w-5xl">
          {loading ? (
            <p className="text-zinc-400">Loading order details...</p>
          ) : !order ? (
            <div className="glass rounded-[28px] p-8">
              <h1 className="text-3xl font-semibold text-white">Order not found</h1>
              <p className="mt-3 text-zinc-400">
                This order could not be loaded.
              </p>
            </div>
          ) : (
            <div className="glass rounded-[32px] p-8 md:p-10 print:bg-white print:text-black print:shadow-none print:border-none">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-zinc-500 print:text-gray-500">
                    Invoice
                  </p>
                  <h1 className="mt-2 text-4xl font-semibold text-white print:text-black">
                    SoundVerse Invoice
                  </h1>
                  <p className="mt-3 text-zinc-400 print:text-gray-700">
                    Premium sound. Modern choice.
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="text-zinc-400 print:text-gray-700">
                    <span className="font-medium text-white print:text-black">Order Code:</span>{" "}
                    {order.order_code}
                  </p>
                  <p className="text-zinc-400 print:text-gray-700">
                    <span className="font-medium text-white print:text-black">Payment Ref:</span>{" "}
                    {order.payment_reference}
                  </p>
                  <p className="text-zinc-400 print:text-gray-700">
                    <span className="font-medium text-white print:text-black">Payment Method:</span>{" "}
                    {order.payment_method}
                  </p>
                  <p className="text-zinc-400 print:text-gray-700">
                    <span className="font-medium text-white print:text-black">Payment Status:</span>{" "}
                    {order.payment_status}
                  </p>
                  <p className="text-zinc-400 print:text-gray-700">
                    <span className="font-medium text-white print:text-black">Order Status:</span>{" "}
                    <OrderStatusBadge status={order.order_status} />
                  </p>
                </div>
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 print:border-gray-300 print:bg-white">
                  <h2 className="text-lg font-semibold text-white print:text-black">
                    Billing Details
                  </h2>
                  <div className="mt-4 space-y-2 text-sm text-zinc-400 print:text-gray-700">
                    <p><span className="font-medium text-white print:text-black">Billing Name:</span> {order.billing_name}</p>
                    <p><span className="font-medium text-white print:text-black">Customer:</span> {order.customer_name}</p>
                    <p><span className="font-medium text-white print:text-black">Email:</span> {order.customer_email}</p>
                    <p><span className="font-medium text-white print:text-black">Phone:</span> {order.customer_phone}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 print:border-gray-300 print:bg-white">
                  <h2 className="text-lg font-semibold text-white print:text-black">
                    Shipping Address
                  </h2>
                  <div className="mt-4 space-y-2 text-sm text-zinc-400 print:text-gray-700">
                    <p>{order.address_line_1}</p>
                    {order.address_line_2 ? <p>{order.address_line_2}</p> : null}
                    <p>
                      {order.city}, {order.state} - {order.pincode}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 print:border-gray-300 print:bg-white">
                <p className="text-sm text-zinc-500 print:text-gray-600">Current Order Status</p>
                <p className="mt-2 text-lg font-semibold text-white print:text-black capitalize">
                  {order.order_status.replaceAll("_", " ")}
                </p>
              </div>

              <div className="mt-6">
                <OrderTrackingTimeline status={order.order_status} />
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-semibold text-white print:text-black">
                  Ordered Items
                </h2>

                <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10 print:border-gray-300">
                  <table className="min-w-full text-sm">
                    <thead className="bg-white/5 text-left text-zinc-400 print:bg-gray-100 print:text-gray-700">
                      <tr>
                        <th className="px-4 py-3">Product</th>
                        <th className="px-4 py-3">Qty</th>
                        <th className="px-4 py-3">Unit Price</th>
                        <th className="px-4 py-3">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {JSON.parse(order.items_json || "[]").map((item: any) => (
                        <tr key={item.id} className="border-t border-white/10 print:border-gray-300">
                          <td className="px-4 py-4 text-white print:text-black">
                            {item.name}
                          </td>
                          <td className="px-4 py-4 text-zinc-300 print:text-gray-700">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-4 text-zinc-300 print:text-gray-700">
                            {formatPrice(item.price)}
                          </td>
                          <td className="px-4 py-4 font-medium text-white print:text-black">
                            {formatPrice(item.price * item.quantity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-5 print:border-gray-300 print:bg-white">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between text-zinc-400 print:text-gray-700">
                      <span>Subtotal</span>
                      <span>{formatPrice(order.subtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-400 print:text-gray-700">
                      <span>Shipping</span>
                      <span>{formatPrice(order.shipping)}</span>
                    </div>
                    <div className="border-t border-white/10 pt-3 print:border-gray-300">
                      <div className="flex items-center justify-between text-base font-semibold text-white print:text-black">
                        <span>Total</span>
                        <span>{formatPrice(order.total_amount)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 print:hidden">
                {order.order_status === "delivered" && (
                  <button
                    onClick={handleDownloadInvoice}
                    className="btn-primary rounded-full px-6 py-3 text-sm font-medium"
                  >
                    Download Invoice PDF
                  </button>
                )}

                {["pending", "confirmed", "packed"].includes(order.order_status) && (
                  <button
                    onClick={handleCancelOrder}
                    className="rounded-full border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 px-6 py-3 text-sm font-medium text-red-400 transition-colors"
                  >
                    Cancel Order
                  </button>
                )}

                <button
                  onClick={() => router.push("/orders")}
                  className="btn-secondary rounded-full px-6 py-3 text-sm font-medium"
                >
                  Back to Orders
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
