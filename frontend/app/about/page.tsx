"use client";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      <section className="py-16 md:py-20">
        <div className="container-width max-w-5xl">
          
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              About SoundVerse
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
              Crafting the Future of Sound
            </h1>
            <p className="mt-5 text-zinc-400">
              SoundVerse is a modern e-commerce platform focused on delivering
              premium audio experiences through carefully curated headphones.
            </p>
          </motion.div>

          {/* Brand Section */}
          <div className="mt-14 glass rounded-[32px] p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-white">
              Our Vision
            </h2>

            <p className="mt-4 text-zinc-400 leading-7">
              At SoundVerse, we believe that sound is more than just audio — it is
              an experience. Our goal is to bridge technology and lifestyle by
              providing users with the best headphones tailored to their needs.
              From immersive music listening to competitive gaming, we ensure that
              every product delivers excellence.
            </p>

            <p className="mt-4 text-zinc-400 leading-7">
              With smart features like AI-based product discovery, real-time order
              tracking, and a modern user experience, SoundVerse is designed to
              feel like a next-generation digital marketplace.
            </p>
          </div>

          {/* Founder Section */}
          <div className="mt-10 glass rounded-[32px] p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-white">
              Meet the Founder
            </h2>

            <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center">
              
              {/* Avatar */}
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center text-white text-xl font-bold">
                SG
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white">
                  Surdar Gope
                </h3>

                <p className="mt-2 text-zinc-400 leading-7">
                  Surdar Gope is the creator of SoundVerse, driven by a passion
                  for technology, design, and building real-world digital products.
                  This platform represents a combination of modern web development,
                  user experience design, and scalable system architecture.
                </p>

                <p className="mt-3 text-zinc-400">
                  His vision is to create systems that are not only functional but
                  also intuitive, secure, and industry-ready.
                </p>

                {/* Instagram */}
                <a
                  href="https://instagram.com/surdar_gope"
                  target="_blank"
                  className="inline-block mt-4 text-blue-400 hover:text-cyan-300 transition"
                >
                  Instagram: @surdar_gope →
                </a>
              </div>
            </div>
          </div>

          {/* Footer text */}
          <div className="mt-12 text-center text-sm text-zinc-500">
            Built with passion using modern technologies.
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
