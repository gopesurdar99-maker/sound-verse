"use client";

import { useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin/admin-page-header";
import AdminStatCard from "@/components/admin/admin-stat-card";
import { fetchDashboardSummary } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";

export default function AdminDashboardPage() {
  const token = useAuthStore((s) => s.token);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!token) return;

      try {
        const data = await fetchDashboardSummary(token);
        setSummary(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  return (
    <section>
      <AdminPageHeader
        title="Dashboard"
        description="Overview of products, orders, stock alerts, and pending users."
      />

      {loading ? (
        <div className="text-zinc-400">Loading dashboard...</div>
      ) : !summary ? (
        <div className="text-red-300">Failed to load dashboard data.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <AdminStatCard label="Total Products" value={summary.total_products} />
          <AdminStatCard label="Total Orders" value={summary.total_orders} />
          <AdminStatCard label="Low Stock Items" value={summary.low_stock_count} />
          <AdminStatCard label="Featured Products" value={summary.featured_products} />
          <AdminStatCard label="Pending Users" value={summary.pending_users} />
        </div>
      )}
    </section>
  );
}
