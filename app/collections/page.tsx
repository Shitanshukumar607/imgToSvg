"use client";

import { CollectionsPageSkeleton } from "@/components/Collections/LoadingSkeleton";
import { Pagination } from "@/components/Collections/Pagination";
import { WorkCard } from "@/components/Collections/WorkCard";
import { WorksFilter, applyFilter } from "@/components/Collections/WorksFilter";
import { WorkViewer } from "@/components/Collections/WorkViewer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Work, WorksResponse } from "@/types/work";
import { motion } from "framer-motion";
import {
  FolderOpen,
  Image as ImageIcon,
  Loader2,
  Plus,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const CollectionsPage = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<
    "all" | "processed" | "processing" | "recent" | "oldest"
  >("all");

  const limit = 2;

  useEffect(() => {
    fetchWorks(currentPage);
  }, [currentPage]);

  const fetchWorks = async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/works?page=${page}&limit=${limit}`);

      if (!response.ok) {
        if (response.status === 401) {
          setError("Please log in to view your collections");
          return;
        }
        throw new Error("Failed to fetch works");
      }

      const data: WorksResponse = await response.json();
      setWorks(data.works);
      setTotalCount(data.total);
      setTotalPages(Math.ceil(data.total / limit));
    } catch (err) {
      console.error("Error fetching works:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (work: Work) => {
    if (!work.svg_data) return;

    const blob = new Blob([work.svg_data], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${work.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleView = (work: Work) => {
    setSelectedWork(work);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSelectedWork(null);
  };

  const filteredWorks = applyFilter(works, currentFilter).filter(
    (work) =>
      work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (work.description &&
        work.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const worksCount = {
    all: works.length,
    processed: works.filter((work) => work.svg_data).length,
    processing: works.filter((work) => !work.svg_data).length,
  };

  if (loading && works.length === 0) {
    return <CollectionsPageSkeleton />;
  }

  if (error) {
    return (
      <section className="relative overflow-hidden bg-zinc-50 dark:bg-neutral-900/80 min-h-screen">
        {/* Accent Corner Lines */}
        <div className="hidden sm:block absolute top-10 left-10 h-16 w-16 border-t-2 border-l-2 border-emerald-400 dark:border-violet-500 opacity-60 rounded-tl-lg" />
        <div className="hidden sm:block absolute bottom-10 right-10 h-20 w-20 border-b-2 border-r-2 border-emerald-400 dark:border-violet-500 opacity-60 rounded-br-lg" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/40 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <FolderOpen className="h-16 w-16 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-neutral-100 mb-4">
              Unable to load collections
            </h2>
            <p className="text-xl text-slate-600 dark:text-neutral-400 mb-8">
              {error}
            </p>
            {error.includes("log in") && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/login">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white py-4 px-8 text-lg font-semibold rounded-xl shadow-lg">
                    Go to Login
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-zinc-50 dark:bg-neutral-900/80 min-h-screen">
      {/* Accent Corner Lines */}
      <div className="hidden sm:block absolute top-10 left-10 h-16 w-16 border-t-2 border-l-2 border-emerald-400 dark:border-violet-500 opacity-60 rounded-tl-lg" />
      <div className="hidden sm:block absolute bottom-10 right-10 h-20 w-20 border-b-2 border-r-2 border-emerald-400 dark:border-violet-500 opacity-60 rounded-br-lg" />

      {/* Geometric Shape Decorations */}
      <div className="absolute top-1/3 -left-6 w-24 h-24 border border-emerald-300 dark:border-violet-400/40 rounded-full opacity-30" />
      <div className="absolute bottom-1/4 -right-8 w-20 h-20 border border-emerald-300 dark:border-violet-400/40 rotate-12 opacity-30" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-neutral-100"
          >
            My Collections
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-slate-600 dark:text-neutral-400 mb-8"
          >
            {totalCount > 0
              ? `${totalCount} work${totalCount !== 1 ? "s" : ""} in your collection`
              : "Your creative works will appear here"}
          </motion.p>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Link href="/generate">
              <Button className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-violet-600 dark:hover:bg-violet-700">
                <Plus className="h-4 w-4" />
                Create New Work
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Search and Controls */}
        {works.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-8"
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your works..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-2">
              <WorksFilter
                currentFilter={currentFilter}
                onFilterChange={setCurrentFilter}
                worksCount={worksCount}
              />
            </div>
          </motion.div>
        )}

        {/* Content */}
        {works.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-violet-900/30 dark:to-violet-800/40 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <ImageIcon className="h-16 w-16 text-emerald-600 dark:text-violet-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-neutral-100 mb-4">
              No works yet
            </h2>
            <p className="text-xl text-slate-600 dark:text-neutral-400 mb-8">
              Start creating by converting your first image to SVG
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link href="/generate">
                <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white py-4 px-8 text-lg font-semibold rounded-xl shadow-lg">
                  <Plus className="h-6 w-6 mr-2" />
                  Create Your First Work
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        ) : filteredWorks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-neutral-700 dark:to-neutral-800 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Search className="h-16 w-16 text-slate-600 dark:text-neutral-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-neutral-100 mb-4">
              No results found
            </h2>
            <p className="text-xl text-slate-600 dark:text-neutral-400">
              Try adjusting your search terms or filters
            </p>
          </motion.div>
        ) : (
          <>
            {/* Works Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12"
            >
              {filteredWorks.map((work, index) => (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <WorkCard
                    work={work}
                    onDownload={handleDownload}
                    onView={handleView}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="flex justify-center"
              >
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </motion.div>
            )}
          </>
        )}

        {/* Work Viewer Modal */}
        <WorkViewer
          work={selectedWork}
          isOpen={isViewerOpen}
          onClose={handleCloseViewer}
          onDownload={handleDownload}
        />

        {/* Loading overlay for pagination */}
        {loading && works.length > 0 && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-40">
            <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600 dark:text-violet-500" />
            </div>
          </div>
        )}

        {/* Work Viewer Modal */}
        <WorkViewer
          work={selectedWork}
          isOpen={isViewerOpen}
          onClose={handleCloseViewer}
          onDownload={handleDownload}
        />
      </div>
    </section>
  );
};

export default CollectionsPage;
