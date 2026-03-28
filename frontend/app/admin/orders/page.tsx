"use client";

import { useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin/admin-page-header";
import { fetchAdminOrders, updateAdminOrderStatus } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import OrderStatusBadge from "@/components/shared/order-status-badge";

const orderStatuses = [
  "pending",
  "confirmed",
  "packed",
  "dispatched",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

export default function AdminOrdersPage() {
  const token = useAuthStore((s) => s.token);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    if (!token) return;

    try {
      const data = await fetchAdminOrders(token);
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [token]);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    if (!token) return;

    try {
      await updateAdminOrderStatus(token, orderId, newStatus);
      await loadOrders();
    } catch (error) {
      console.error(error);
      alert("Failed to update order status");
    }
  };

  return (
    <section>
      <AdminPageHeader
        title="Orders"
        description="Track placed orders, payment methods, and update fulfillment status."
      />

      {loading ? (
        <div className="text-zinc-400">Loading orders...</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="min-w-full text-sm">
            <thead className="border-b border-white/10 bg-white/5 text-left text-zinc-400">
              <tr>
                <th className="px-4 py-3">Order Code</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Current Status</th>
                <th className="px-4 py-3">Update Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr key={order.id} className="border-b border-white/5">
                  <td className="px-4 py-4 font-medium text-white">
                    {order.order_code}
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-white">{order.customer_name}</p>
                    <p className="text-xs text-zinc-500">{order.customer_email}</p>
                  </td>
                  <td className="px-4 py-4 text-zinc-300">₹{order.total_amount}</td>
                  <td className="px-4 py-4 text-zinc-300">{order.payment_method}</td>
                  <td className="px-4 py-4">
                    <OrderStatusBadge status={order.order_status} />
                  </td>
                  <td className="px-4 py-4">
                    <select
                      value={order.order_status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-white"
                    >
                      {orderStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status.replaceAll("_", " ")}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-zinc-500">
                    No orders found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
