import Link from "next/link";
import { WandSparkles } from "lucide-react";

export default function SmartFinderPreview() {
  return (
    <section className="py-10 md:py-16">
      <div className="container-width">
        <div className="glass rounded-[32px] p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
                <WandSparkles className="h-4 w-4 text-violet-400" />
                Smart Finder
              </div>

              <h2 className="mt-5 text-3xl font-semibold text-white md:text-4xl">
                Not sure what to buy?
                <span className="text-gradient"> Let SoundVerse guide you.</span>
              </h2>

              <p className="mt-4 max-w-2xl text-zinc-400">
                Choose based on budget, usage, category, and comfort. Our smart
                finder helps users discover the right headphone faster.
              </p>

              <div className="mt-7">
                <Link
                  href="/smart-finder"
                  className="btn-primary rounded-full px-6 py-3 text-sm font-medium"
                >
                  Launch Smart Finder
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-zinc-500">Use Case</p>
                <p className="mt-1 font-medium text-white">Gaming / Music / Calls</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-zinc-500">Category</p>
                <p className="mt-1 font-medium text-white">Wired / Wireless</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-zinc-500">Budget</p>
                <p className="mt-1 font-medium text-white">Under ₹1000 to Premium</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
