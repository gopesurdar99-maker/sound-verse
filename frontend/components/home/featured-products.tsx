import ProductCard from "@/components/products/product-card";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/types";
export default async function FeaturedProducts() {
  const products = await fetchProducts();
  const featuredProducts = products.filter((p: Product) => p.featured);

  return (
    <section className="py-10 md:py-16">
      <div className="container-width">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
            Featured
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
            Curated premium picks
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Explore standout headphones selected for performance, comfort,
            design, and modern listening needs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.slice(0, 4).map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
