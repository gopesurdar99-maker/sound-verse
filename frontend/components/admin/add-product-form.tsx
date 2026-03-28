"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAdminProduct } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";

const initialState = {
  name: "",
  slug: "",
  brand: "",
  main_category: "Wireless",
  sub_category: "",
  price: "",
  original_price: "",
  rating: "4.0",
  review_count: "0",
  stock: "10",
  featured: false,
  best_seller: false,
  use_case: "",
  noise_cancellation: false,
  battery_life: "",
  connectivity: "",
  mic: false,
  color: "",
  image: "",
  description: "",
};

export default function AddProductForm() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const [form, setForm] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("Please login as admin first.");
      return;
    }

    const isAllowedImageUrl = (url: string) => {
      try {
        const parsed = new URL(url);
        const allowedHosts = [
          "images.unsplash.com",
          "images.pexels.com",
          "res.cloudinary.com",
        ];
        return allowedHosts.includes(parsed.hostname);
      } catch {
        return false;
      }
    };

    if (!isAllowedImageUrl(form.image)) {
      alert("Please use an image from Unsplash, Pexels, or Cloudinary.");
      return;
    }

    try {
      setIsSubmitting(true);

      await createAdminProduct(token, {
        name: form.name,
        slug: form.slug,
        brand: form.brand,
        main_category: form.main_category,
        sub_category: form.sub_category,
        price: Number(form.price),
        original_price: Number(form.original_price),
        rating: Number(form.rating),
        review_count: Number(form.review_count),
        stock: Number(form.stock),
        featured: form.featured,
        best_seller: form.best_seller,
        use_case: form.use_case,
        noise_cancellation: form.noise_cancellation,
        battery_life: form.battery_life,
        connectivity: form.connectivity,
        mic: form.mic,
        color: form.color,
        image: form.image,
        description: form.description,
      });

      setForm(initialState);
      window.location.reload();
      alert("Product added successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-white/5 p-5"
    >
      <h2 className="text-xl font-semibold text-white">Add Product</h2>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <input value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Product name" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white" required />
        <input value={form.slug} onChange={(e) => updateField("slug", e.target.value)} placeholder="Slug" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white" required />
        <input value={form.brand} onChange={(e) => updateField("brand", e.target.value)} placeholder="Brand" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white" required />
        <select value={form.main_category} onChange={(e) => updateField("main_category", e.target.value)} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white">
          <option value="Wireless">Wireless</option>
          <option value="Wired">Wired</option>
        </select>

        <input value={form.sub_category} onChange={(e) => updateField("sub_category", e.target.value)} placeholder="Sub category" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white" required />
        <input value={form.color} onChange={(e) => updateField("color", e.target.value)} placeholder="Color" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white" required />

        <input type="number" value={form.price} onChange={(e) => updateField("price", e.target.value)} placeholder="Price" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white" required />
        <input type="number" value={form.original_price} onChange={(e) => updateField("original_price", e.target.value)} placeholder="Original price" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white" required />

        <input value={form.battery_life} onChange={(e) => updateField("battery_life", e.target.value)} placeholder="Battery life" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white" required />
        <input value={form.connectivity} onChange={(e) => updateField("connectivity", e.target.value)} placeholder="Connectivity" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white" required />

        <input type="number" value={form.stock} onChange={(e) => updateField("stock", e.target.value)} placeholder="Stock" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white" required />
        <input value={form.use_case} onChange={(e) => updateField("use_case", e.target.value)} placeholder="Use case (Music, Calls, Travel)" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white" required />

        <input value={form.image} onChange={(e) => updateField("image", e.target.value)} placeholder="Image URL" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white md:col-span-2" required />

        <textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} placeholder="Description" className="min-h-28 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white md:col-span-2" required />
      </div>

      <div className="mt-4 flex flex-wrap gap-5 text-sm text-zinc-300">
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={(e) => updateField("featured", e.target.checked)} /> Featured</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.best_seller} onChange={(e) => updateField("best_seller", e.target.checked)} /> Best Seller</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.noise_cancellation} onChange={(e) => updateField("noise_cancellation", e.target.checked)} /> Noise Cancellation</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.mic} onChange={(e) => updateField("mic", e.target.checked)} /> Mic</label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black disabled:opacity-70"
      >
        {isSubmitting ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}
