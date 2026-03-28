"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import ProductImage from "@/components/shared/product-image";
import { useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";

type Props = {
  product: any;
};

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((s) => s.addToCart);
  const showToast = useUiStore((s) => s.showToast);

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`${product.name} added to cart`);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="card-hover glass overflow-hidden rounded-[28px]"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative h-72 overflow-hidden bg-black/20">
          <ProductImage
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition duration-500 hover:scale-105"
          />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {product.best_seller && (
              <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs text-white backdrop-blur-md">
                Best Seller
              </span>
            )}
            {product.noise_cancellation && (
              <span className="rounded-full border border-blue-400/20 bg-blue-500/15 px-3 py-1 text-xs text-cyan-300 backdrop-blur-md">
                ANC
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            {product.brand}
          </span>
          <span className="text-xs text-zinc-400">{product.main_category}</span>
        </div>

        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-3 line-clamp-2 min-h-[56px] text-lg font-semibold text-white transition hover:text-cyan-300">
            {product.name}
          </h3>
        </Link>

        <div className="mt-3 flex items-center gap-2 text-sm text-zinc-400">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span>{product.rating}</span>
          <span>·</span>
          <span>{product.review_count} reviews</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {product.use_case.split(",").slice(0, 2).map((item: string) => (
            <span
              key={item.trim()}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
            >
              {item.trim()}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xl font-semibold text-white">
              {formatPrice(product.price)}
            </p>
            <p className="text-sm text-zinc-500 line-through">
              {formatPrice(product.original_price)}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className="btn-primary inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}
