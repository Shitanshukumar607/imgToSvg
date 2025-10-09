"use client";

import { motion } from "framer-motion";

export function WorkCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-emerald-200/50 dark:border-violet-500/30 rounded-2xl overflow-hidden shadow-xl"
    >
      {/* Image skeleton */}
      <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-neutral-700 dark:to-neutral-800 animate-pulse relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-neutral-600/20 to-transparent animate-shimmer" />
      </div>

      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Title skeleton */}
        <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-neutral-700 dark:to-neutral-600 rounded-xl animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-neutral-500/30 to-transparent animate-shimmer" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-3">
          <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-neutral-700 dark:to-neutral-600 rounded-lg animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-neutral-500/30 to-transparent animate-shimmer" />
          </div>
          <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-neutral-700 dark:to-neutral-600 rounded-lg animate-pulse w-3/4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-neutral-500/30 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Footer skeleton */}
        <div className="flex justify-between items-center pt-2">
          <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-neutral-700 dark:to-neutral-600 rounded-full animate-pulse w-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-neutral-500/30 to-transparent animate-shimmer" />
          </div>
          <div className="h-6 bg-gradient-to-r from-emerald-200 to-emerald-300 dark:from-violet-700 dark:to-violet-600 rounded-full animate-pulse w-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-violet-400/30 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function CollectionsPageSkeleton() {
  return (
    <section className="relative overflow-hidden bg-zinc-50 dark:bg-neutral-900/80 min-h-screen">
      {/* Accent Corner Lines */}
      <div className="hidden sm:block absolute top-10 left-10 h-16 w-16 border-t-2 border-l-2 border-emerald-400 dark:border-violet-500 opacity-60 rounded-tl-lg" />
      <div className="hidden sm:block absolute bottom-10 right-10 h-20 w-20 border-b-2 border-r-2 border-emerald-400 dark:border-violet-500 opacity-60 rounded-br-lg" />

      {/* Geometric Shape Decorations */}
      <div className="absolute top-1/3 -left-6 w-24 h-24 border border-emerald-300 dark:border-violet-400/40 rounded-full opacity-30" />
      <div className="absolute bottom-1/4 -right-8 w-20 h-20 border border-emerald-300 dark:border-violet-400/40 rotate-12 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
        {/* Header skeleton */}
        <div className="text-center mb-16 space-y-6">
          {/* Badge skeleton */}
          <div className="h-8 bg-gradient-to-r from-emerald-200 to-emerald-300 dark:from-violet-700 dark:to-violet-600 rounded-full animate-pulse w-48 mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-violet-400/30 to-transparent animate-shimmer" />
          </div>
          
          {/* Title skeleton */}
          <div className="h-16 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-neutral-700 dark:to-neutral-600 rounded-2xl animate-pulse w-96 mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-neutral-500/30 to-transparent animate-shimmer" />
          </div>
          
          {/* Subtitle skeleton */}
          <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-neutral-700 dark:to-neutral-600 rounded-xl animate-pulse w-80 mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-neutral-500/30 to-transparent animate-shimmer" />
          </div>
          
          {/* Button skeleton */}
          <div className="h-12 bg-gradient-to-r from-emerald-200 to-emerald-300 dark:from-violet-700 dark:to-violet-600 rounded-xl animate-pulse w-48 mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-violet-400/30 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Search and controls skeleton */}
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-12 max-w-4xl mx-auto">
          <div className="flex-1 max-w-lg h-12 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-neutral-700 dark:to-neutral-600 rounded-xl animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-neutral-500/30 to-transparent animate-shimmer" />
          </div>
          <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-neutral-700 dark:to-neutral-600 rounded-xl animate-pulse w-40 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-neutral-500/30 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Grid skeleton */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <WorkCardSkeleton />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
