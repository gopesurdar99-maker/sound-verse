import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ProductCard from "@/components/products/product-card";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/types";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const selectedCategory = params.category;

  const products = await fetchProducts();

  const filteredProducts = selectedCategory
    ? products.filter((p: Product) => p.main_category === selectedCategory)
    : products;

  return (
    <main>
      <Navbar />

      <section className="py-16 md:py-20">
        <div className="container-width">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              Product Catalog
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">
              {selectedCategory ? `${selectedCategory} Headphones` : "All Headphones"}
            </h1>
            <p className="mt-4 max-w-2xl text-zinc-400">
              Explore premium sound gear designed for music, gaming, work, and
              all-day comfort.
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-3">
            {["All", "Wired", "Wireless"].map((item) => {
              const href = item === "All" ? "/products" : `/products?category=${item}`;
              const active =
                (item === "All" && !selectedCategory) || item === selectedCategory;

              return (
                <a
                  key={item}
                  href={href}
                  className={`rounded-full px-5 py-2 text-sm transition ${
                    active
                      ? "bg-white/15 text-white font-medium"
                      : "border border-white/10 bg-white/5 text-zinc-300 hover:border-blue-400/30"
                  }`}
                >
                  {item}
                </a>
              );
            })}
          </div>

          <div className="mb-8 grid gap-4 rounded-[28px] border border-white/10 bg-white/[0.03] p-5 md:grid-cols-4">
            <div>
              <p className="text-sm text-zinc-500">Products</p>
              <p className="mt-1 text-xl font-semibold text-white">
                {filteredProducts.length}
              </p>
            </div>
            <div>
              <p className="text-sm text-zinc-500">Category</p>
              <p className="mt-1 text-xl font-semibold text-white">
                {selectedCategory || "All"}
              </p>
            </div>
            <div>
              <p className="text-sm text-zinc-500">Top Focus</p>
              <p className="mt-1 text-xl font-semibold text-white">
                Premium Audio
              </p>
            </div>
            <div>
              <p className="text-sm text-zinc-500">Experience</p>
              <p className="mt-1 text-xl font-semibold text-white">
                Smart Discovery
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
