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
  Search
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
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <FolderOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">
              Unable to load collections
            </h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            {error.includes("log in") && (
              <Link href="/login">
                <Button>Go to Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">My Collections</h1>
            <p className="text-muted-foreground">
              {totalCount > 0
                ? `${totalCount} work${
                    totalCount !== 1 ? "s" : ""
                  } in your collection`
                : "Your creative works will appear here"}
            </p>
          </div>
          <Link href="/generate">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Work
            </Button>
          </Link>
        </div>

        {/* Search and Controls */}
        {works.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
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
          </div>
        )}
      </motion.div>

      {/* Content */}
      {works.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center min-h-[400px]"
        >
          <div className="text-center max-w-md">
            <ImageIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">No works yet</h2>
            <p className="text-muted-foreground mb-6">
              Start creating by converting your first image to SVG
            </p>
            <Link href="/generate">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Your First Work
              </Button>
            </Link>
          </div>
        </motion.div>
      ) : filteredWorks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center min-h-[400px]"
        >
          <div className="text-center">
            <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">No results found</h2>
            <p className="text-muted-foreground">
              Try adjusting your search terms
            </p>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Works Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-12 flex justify-center"
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
          <div className="bg-background p-4 rounded-lg shadow-lg">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionsPage;
