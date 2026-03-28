"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteAdminProduct, updateAdminProductStock } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";

export default function AdminProductsTable({ products }: { products: any[] }) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  
  const [editingStockId, setEditingStockId] = useState<number | null>(null);
  const [newStock, setNewStock] = useState<string>("");

  const handleDelete = async (id: number) => {
    if (!token) {
      alert("Please login as admin first.");
      return;
    }

    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;

    try {
      await deleteAdminProduct(token, id);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  const handleStockUpdateSubmit = async (id: number) => {
    if (!token) {
      alert("Please login as admin first.");
      return;
    }

    const stock = Number(newStock);
    if (Number.isNaN(stock) || stock < 0) {
      alert("Invalid stock value");
      return;
    }

    try {
      await updateAdminProductStock(token, id, stock);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to update stock");
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
      <table className="min-w-full text-sm">
        <thead className="border-b border-white/10 bg-white/5 text-left text-zinc-400">
          <tr>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-white/5">
              <td className="px-4 py-4">
                <p className="font-medium text-white">{product.name}</p>
                <p className="text-xs text-zinc-500">{product.brand}</p>
              </td>
              <td className="px-4 py-4 text-zinc-300">
                {product.main_category} / {product.sub_category}
              </td>
              <td className="px-4 py-4 text-zinc-300">₹{product.price}</td>
              <td className="px-4 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    product.stock <= 5
                      ? "bg-red-500/15 text-red-300"
                      : "bg-emerald-500/15 text-emerald-300"
                  }`}
                >
                  {product.stock}
                </span>
              </td>
              <td className="px-4 py-4">
                <div className="flex gap-2">
                  {editingStockId === product.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        value={newStock}
                        onChange={(e) => setNewStock(e.target.value)}
                        className="w-16 rounded-md border border-white/10 bg-black/20 px-2 py-1 text-xs text-white outline-none focus:border-white/20"
                        autoFocus
                      />
                      <button
                        onClick={() => handleStockUpdateSubmit(product.id)}
                        className="rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300 transition hover:bg-emerald-500/20"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingStockId(null)}
                        className="rounded-lg border border-white/10 px-3 py-2 text-xs text-zinc-400 transition hover:bg-white/10"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingStockId(product.id);
                          setNewStock(String(product.stock));
                        }}
                        className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white transition hover:bg-white/5"
                      >
                        Update Stock
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs text-red-300 transition hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
