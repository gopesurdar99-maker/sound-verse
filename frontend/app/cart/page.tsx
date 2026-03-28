"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import ProductImage from "@/components/shared/product-image";
import { useAuthStore } from "@/store/auth-store";

export default function CartPage() {
  const router = useRouter();

  const user = useAuthStore((s) => s.user);

  const cartItems = useCartStore((s) => s.items);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const increaseQty = useCartStore((s) => s.increaseQty);
  const decreaseQty = useCartStore((s) => s.decreaseQty);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 199 : 0;
  const total = subtotal + shipping;

  return (
    <main>
      <Navbar />

      <section className="py-16 md:py-20">
        <div className="container-width">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              Cart
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">
              Review your order
            </h1>
            <p className="mt-4 max-w-2xl text-zinc-400">
              Review your selected items before continuing to checkout.
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div className="glass rounded-[28px] p-10 text-center">
              <h2 className="text-2xl font-semibold text-white">Your cart is empty</h2>
              <p className="mt-3 text-zinc-400">
                Browse premium headphones and add products to continue.
              </p>
              <Link
                href="/products"
                className="btn-primary mt-6 inline-block rounded-full px-6 py-3 text-sm font-medium"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="glass flex flex-col gap-4 rounded-[28px] p-4 sm:flex-row"
                  >
                    <div className="relative h-32 w-full overflow-hidden rounded-2xl sm:w-36">
                      <ProductImage
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="144px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                          SoundVerse Pick
                        </p>
                        <h2 className="mt-1 text-xl font-semibold text-white">
                          {item.name}
                        </h2>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                          <button
                            onClick={() => decreaseQty(item.id)}
                            className="text-zinc-300"
                          >
                            -
                          </button>
                          <span className="text-sm text-white">{item.quantity}</span>
                          <button
                            onClick={() => increaseQty(item.id)}
                            className="text-zinc-300"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-semibold text-white">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm text-red-400 transition hover:text-red-300"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass h-fit rounded-[28px] p-6">
                <h2 className="text-2xl font-semibold text-white">Order Summary</h2>

                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Shipping</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between text-base font-semibold text-white">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (!user) {
                      router.push("/login");
                      return;
                    }
                    router.push("/checkout");
                  }}
                  className="btn-primary mt-6 w-full rounded-full px-6 py-3 text-sm font-medium"
                >
                  Proceed to Checkout
                </button>

                {!user && (
                  <p className="mt-3 text-center text-xs text-zinc-500">
                    Login is required before checkout.
                  </p>
                )}

                <Link
                  href="/products"
                  className="btn-secondary mt-3 block rounded-full px-6 py-3 text-center text-sm font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
