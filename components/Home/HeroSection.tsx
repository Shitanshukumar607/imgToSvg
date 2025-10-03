"use client";

import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Trophy } from "lucide-react";
import Link from "next/link";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-zinc-50 dark:bg-neutral-900/80">
      {/* Accent Corner Lines */}
      <div className="hidden sm:block absolute top-10 left-10 h-16 w-16 border-t-2 border-l-2 border-emerald-400 dark:border-violet-500 opacity-60 rounded-tl-lg" />
      <div className="hidden sm:block absolute bottom-10 right-10 h-20 w-20 border-b-2 border-r-2 border-emerald-400 dark:border-violet-500 opacity-60 rounded-br-lg" />

      {/* Geometric Shape Decorations */}
      <div className="absolute top-1/3 -left-6 w-24 h-24 border border-emerald-300 dark:border-violet-400/40 rounded-full opacity-30" />
      <div className="absolute bottom-1/4 -right-8 w-20 h-20 border border-emerald-300 dark:border-violet-400/40 rotate-12 opacity-30" />

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
        <motion.div
          className="text-center"
          initial="hidden"
          animate="show"
          variants={container}
        >
          {/* Badge */}
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 dark:bg-violet-700/30 dark:text-violet-300 text-sm font-medium px-4 py-2 rounded-full mb-6"
          >
            <Trophy className="h-4 w-4" />
            <span>Fast & Secure Converter</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-4xl sm:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight mb-6 text-slate-900 dark:text-neutral-100"
            variants={item}
          >
            Your Ultimate
            <span className="text-emerald-600 dark:text-violet-500"> SVG </span>
            Companion
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-lg text-slate-600 dark:text-neutral-400 max-w-3xl mx-auto lg:text-xl mb-10"
            variants={item}
          >
            Effortlessly transform your PNG, JPG, and other raster images into
            high-quality, editable SVG vectors with a single click. Perfect for
            any creator.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.4,
                },
              },
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              variants={item}
            >
              <Link href="/leaderboard">
                <Button
                  size="lg"
                  className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-violet-600 dark:hover:bg-violet-700 transition-transform cursor-pointer"
                >
                  Upload Image & Convert
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
