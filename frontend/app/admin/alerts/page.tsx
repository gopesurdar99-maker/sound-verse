"use client";

import { useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin/admin-page-header";
import { fetchLowStockAlerts } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";

export default function AdminAlertsPage() {
  const token = useAuthStore((s) => s.token);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!token) return;

      try {
        const data = await fetchLowStockAlerts(token);
        setAlerts(data);
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
        title="Low Stock Alerts"
        description="Products that need quick inventory attention."
      />

      {loading ? (
        <div className="text-zinc-400">Loading alerts...</div>
      ) : (
        <div className="grid gap-4">
          {alerts.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-zinc-400">
              No low stock alerts right now.
            </div>
          ) : (
            alerts.map((item: any) => (
              <div
                key={item.id}
                className="rounded-2xl border border-red-400/15 bg-red-500/10 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-medium text-white">{item.name}</p>
                    <p className="mt-1 text-sm text-zinc-400">
                      {item.brand} · {item.main_category} / {item.sub_category}
                    </p>
                  </div>

                  <div className="rounded-full bg-red-500/20 px-4 py-2 text-sm text-red-300">
                    Stock Left: {item.stock}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}
