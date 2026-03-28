"use client";

import { useEffect, useState } from "react";
import AddProductForm from "@/components/admin/add-product-form";
import AdminPageHeader from "@/components/admin/admin-page-header";
import AdminProductsTable from "@/components/admin/admin-products-table";
import { fetchAdminProducts } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";

export default function AdminProductsPage() {
  const token = useAuthStore((s) => s.token);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    if (!token) return;

    try {
      const data = await fetchAdminProducts(token);
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [token]);

  return (
    <section>
      <AdminPageHeader
        title="Products"
        description="Add, manage, and control inventory products."
      />

      {loading ? (
        <div className="text-zinc-400">Loading products...</div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <AddProductForm />
          <AdminProductsTable products={products} />
        </div>
      )}
    </section>
  );
}
