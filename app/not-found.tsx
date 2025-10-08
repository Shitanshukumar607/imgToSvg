"use client";

import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, Home, SearchX } from "lucide-react";
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

const NotFound = () => {
  return (
    <section className="relative overflow-hidden bg-zinc-50 dark:bg-neutral-900/80 min-h-svh flex items-center justify-center p-6">
      {/* Accent Corner Lines */}
      <div className="hidden sm:block absolute top-10 left-10 h-16 w-16 border-t-2 border-l-2 border-emerald-400 dark:border-violet-500 opacity-60 rounded-tl-lg" />
      <div className="hidden sm:block absolute bottom-10 right-10 h-20 w-20 border-b-2 border-r-2 border-emerald-400 dark:border-violet-500 opacity-60 rounded-br-lg" />

      {/* Geometric Shape Decorations */}
      <div className="absolute top-1/3 -left-6 w-24 h-24 border border-emerald-300 dark:border-violet-400/40 rounded-full opacity-30" />
      <div className="absolute bottom-1/4 -right-8 w-20 h-20 border border-emerald-300 dark:border-violet-400/40 rotate-12 opacity-30" />

      {/* Additional geometric shapes for 404 */}
      <div className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-emerald-200 dark:border-violet-300/30 rotate-45 opacity-20" />
      <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-emerald-100 dark:bg-violet-500/10 rounded-full opacity-40" />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div initial="hidden" animate="show" variants={container}>
          {/* 404 Number with Icon */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            variants={item}
          >
            <SearchX className="size-20 text-emerald-500 dark:text-violet-400" />
            <span className="text-8xl sm:text-9xl font-bold text-emerald-600 dark:text-violet-500 tracking-tight">
              404
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-3xl sm:text-5xl font-bold tracking-tight mb-6 text-slate-900 dark:text-neutral-100"
            variants={item}
          >
            Oops! Page Not Found
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-lg text-slate-600 dark:text-neutral-400 max-w-lg mx-auto mb-10"
            variants={item}
          >
            The page you're looking for seems to have wandered off into the
            digital void. Don't worry, it happens to the best of us!
          </motion.p>

          {/* Action Buttons */}
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
              <Link href="/">
                <Button
                  size="lg"
                  className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-violet-600 dark:hover:bg-violet-700 transition-all duration-200"
                >
                  <Home className="h-5 w-5" />
                  Go Home
                </Button>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              variants={item}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.history.back()}
                className="gap-2 border-emerald-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 dark:border-violet-400/40 dark:text-neutral-300 dark:hover:bg-violet-500/10 dark:hover:border-violet-400 transition-all duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
                Go Back
              </Button>
            </motion.div>
          </motion.div>

          {/* Additional Help Text */}
          <motion.div className="mt-12 text-center" variants={item}>
            <p className="text-sm text-slate-500 dark:text-neutral-500">
              Need help? Visit our{" "}
              <Link
                href="/"
                className="text-emerald-600 dark:text-violet-400 hover:text-emerald-700 dark:hover:text-violet-300 underline underline-offset-2 transition-colors"
              >
                homepage
              </Link>{" "}
              or try converting an image to SVG.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;
