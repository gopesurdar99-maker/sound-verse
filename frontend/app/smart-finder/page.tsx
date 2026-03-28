"use client";

import { useMemo, useState, useEffect } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ProductCard from "@/components/products/product-card";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/types";

type BudgetOption = "any" | "under-1000" | "1000-3000" | "3000-7000" | "7000+";
type CategoryOption = "any" | "Wired" | "Wireless";
type UseCaseOption = "any" | "Music" | "Gaming" | "Calls" | "Travel" | "Workout";
type YesNoAny = "any" | "yes" | "no";

function matchesBudget(price: number, budget: BudgetOption) {
  if (budget === "any") return true;
  if (budget === "under-1000") return price < 1000;
  if (budget === "1000-3000") return price >= 1000 && price <= 3000;
  if (budget === "3000-7000") return price > 3000 && price <= 7000;
  if (budget === "7000+") return price > 7000;
  return true;
}

export default function SmartFinderPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const [budget, setBudget] = useState<BudgetOption>("any");
  const [category, setCategory] = useState<CategoryOption>("any");
  const [useCase, setUseCase] = useState<UseCaseOption>("any");
  const [anc, setAnc] = useState<YesNoAny>("any");
  const [mic, setMic] = useState<YesNoAny>("any");
  const [submitted, setSubmitted] = useState(false);

  const recommendations = useMemo(() => {
    const scored = products
      .map((product) => {
        let score = 0;

        if (matchesBudget(product.price, budget)) score += 3;
        else score -= 4;

        if (category === "any") score += 1;
        else if (product.main_category === category) score += 4;

        if (useCase === "any") score += 1;
        else if (product.use_case && product.use_case.includes(useCase)) score += 4;

        if (anc === "any") score += 1;
        else if (anc === "yes" && product.noise_cancellation) score += 2;
        else if (anc === "no" && !product.noise_cancellation) score += 2;

        if (mic === "any") score += 1;
        else if (mic === "yes" && product.mic) score += 2;
        else if (mic === "no" && !product.mic) score += 2;

        // Spread the score alongside product so we can filter by it
        const finalProduct = { ...product, score };
        return finalProduct;
      })
      .filter((product) => product.score > 0)
      .sort((a, b) => b.score - a.score || b.rating - a.rating);

    return scored.slice(0, 4);
  }, [budget, category, useCase, anc, mic, products]);

  return (
    <main>
      <Navbar />

      <section className="py-16 md:py-20">
        <div className="container-width">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              Smart Finder
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">
              Find your perfect headphone
            </h1>
            <p className="mt-4 max-w-2xl text-zinc-400">
              Answer a few quick questions and SoundVerse will suggest the best
              products for your needs.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="glass rounded-[28px] p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-white">Your preferences</h2>

              <div className="mt-6 grid gap-5">
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">Budget</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value as BudgetOption)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  >
                    <option value="any">Any budget</option>
                    <option value="under-1000">Under ₹1000</option>
                    <option value="1000-3000">₹1000 - ₹3000</option>
                    <option value="3000-7000">₹3000 - ₹7000</option>
                    <option value="7000+">Above ₹7000</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-400">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryOption)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  >
                    <option value="any">Any</option>
                    <option value="Wired">Wired</option>
                    <option value="Wireless">Wireless</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-400">Primary Use</label>
                  <select
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value as UseCaseOption)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  >
                    <option value="any">Any</option>
                    <option value="Music">Music</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Calls">Calls</option>
                    <option value="Travel">Travel</option>
                    <option value="Workout">Workout</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-400">
                    Need Noise Cancellation?
                  </label>
                  <select
                    value={anc}
                    onChange={(e) => setAnc(e.target.value as YesNoAny)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  >
                    <option value="any">Does not matter</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-400">
                    Need Microphone?
                  </label>
                  <select
                    value={mic}
                    onChange={(e) => setMic(e.target.value as YesNoAny)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  >
                    <option value="any">Does not matter</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <button
                  onClick={() => setSubmitted(true)}
                  className="btn-primary mt-2 rounded-full px-6 py-3 text-sm font-medium"
                >
                  Show Recommendations
                </button>
              </div>
            </div>

            <div className="glass rounded-[28px] p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-white">Recommendations</h2>

              {isLoading ? (
                <p className="mt-4 text-zinc-400">Loading audio equipment...</p>
              ) : !submitted ? (
                <p className="mt-4 text-zinc-400">
                  Select your preferences and click “Show Recommendations” to see
                  the best matches.
                </p>
              ) : recommendations.length === 0 ? (
                <p className="mt-4 text-zinc-400">
                  No strong matches found. Try broadening your preferences.
                </p>
              ) : (
                <>
                  <p className="mt-4 text-zinc-400">
                    Based on your choices, these are the best SoundVerse picks for you.
                  </p>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
                    Best matches are selected using your budget, category, primary use, mic need,
                    and noise cancellation preference.
                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {recommendations.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
