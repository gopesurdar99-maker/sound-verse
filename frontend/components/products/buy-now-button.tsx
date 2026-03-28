"use client";

import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";

export default function BuyNowButton({ product }: { product: any }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const router = useRouter();

  const handleBuyNow = () => {
    addToCart(product);
    router.push("/checkout");
  };

  return (
    <button
      onClick={handleBuyNow}
      className="btn-secondary rounded-full px-6 py-3 text-sm font-medium"
    >
      Buy Now
    </button>
  );
}
