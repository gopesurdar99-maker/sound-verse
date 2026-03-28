import ProductImage from "@/components/shared/product-image";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ProductCard from "@/components/products/product-card";
import AddToCartButton from "@/components/products/add-to-cart-button";
import BuyNowButton from "@/components/products/buy-now-button";
import { formatPrice } from "@/lib/utils";
import { fetchProduct, fetchProducts } from "@/lib/api";
import { Product } from "@/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  let product;
  try {
    product = await fetchProduct(slug);
  } catch {
    return notFound();
  }

  const allProducts = await fetchProducts();
  const relatedProducts = allProducts
    .filter(
      (item: Product) =>
        item.slug !== product.slug &&
        item.main_category === product.main_category
    )
    .slice(0, 4);

  return (
    <main>
      <Navbar />

      <section className="py-16 md:py-20">
        <div className="container-width grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="glass relative overflow-hidden rounded-[32px]">
            <div className="relative h-[520px] w-full">
              <ProductImage
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              {product.brand}
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-300">
                {product.main_category}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-300">
                {product.sub_category}
              </span>
              {product.noise_cancellation && (
                <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
                  ANC
                </span>
              )}
            </div>

            <div className="mt-6">
              <p className="text-3xl font-semibold text-white">
                {formatPrice(product.price)}
              </p>
              <p className="mt-1 text-zinc-500 line-through">
                {formatPrice(product.original_price)}
              </p>
            </div>

            <p className="mt-6 max-w-xl leading-7 text-zinc-400">
              {product.description || "Built for modern listening, this headphone balances comfort, design, and performance for users who want a premium experience in music, calls, gaming, and daily audio sessions."}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-zinc-500">Battery</p>
                <p className="mt-1 font-medium text-white">{product.battery_life}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-zinc-500">Connectivity</p>
                <p className="mt-1 font-medium text-white">{product.connectivity}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-zinc-500">Microphone</p>
                <p className="mt-1 font-medium text-white">
                  {product.mic ? "Available" : "Not Included"}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-zinc-500">Stock</p>
                <p className="mt-1 font-medium text-white">{product.stock} units</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {product.use_case && product.use_case.split(", ").map((item: string) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <AddToCartButton product={product} />
              <BuyNowButton product={product} />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container-width">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              Related Picks
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">
              Similar products
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((item: Product) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
