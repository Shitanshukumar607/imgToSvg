"use client";

import { motion } from "framer-motion";

export function WorkCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border rounded-xl overflow-hidden"
    >
      {/* Image skeleton */}
      <div className="aspect-square bg-gray-200 dark:bg-gray-800 animate-pulse" />

      {/* Content skeleton */}
      <div className="p-6 space-y-3">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
        </div>

        {/* Footer skeleton */}
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16" />
        </div>
      </div>
    </motion.div>
  );
}

export function CollectionsPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div className="mb-8 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-48" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-64" />
          </div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-32" />
        </div>

        {/* Search and controls skeleton */}
        <div className="flex gap-4 items-center">
          <div className="flex-1 max-w-md h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="flex gap-2">
            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <WorkCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
