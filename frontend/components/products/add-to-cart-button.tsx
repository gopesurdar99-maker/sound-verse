"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";

type Props = {
  product: any;
};

export default function AddToCartButton({ product }: Props) {
  const addToCart = useCartStore((s) => s.addToCart);
  const showToast = useUiStore((s) => s.showToast);

  const handleAdd = () => {
    addToCart(product);
    showToast(`${product.name} added to cart`);
  };

  return (
    <button
      onClick={handleAdd}
      className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
    >
      <ShoppingCart className="h-4 w-4" />
      Add to Cart
    </button>
  );
}
