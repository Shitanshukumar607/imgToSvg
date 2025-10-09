"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-3 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-emerald-200/50 dark:border-violet-500/30 rounded-2xl p-4 shadow-xl">
      <Button
        variant="outline"
        size="lg"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="border-emerald-200 dark:border-violet-400/40 hover:bg-emerald-50 dark:hover:bg-violet-500/10 text-slate-700 dark:text-neutral-300 disabled:opacity-50 rounded-xl font-semibold px-6"
      >
        <ChevronLeft className="h-5 w-5 mr-2" />
        Previous
      </Button>

      <div className="flex items-center space-x-2">
        {getPageNumbers().map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span className="px-4 py-2 text-slate-500 dark:text-neutral-400 font-semibold">
                ...
              </span>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="lg"
                onClick={() => onPageChange(page as number)}
                className={
                  currentPage === page
                    ? "bg-emerald-600 hover:bg-emerald-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white rounded-xl font-bold min-w-12 shadow-lg"
                    : "border-emerald-200 dark:border-violet-400/40 hover:bg-emerald-50 dark:hover:bg-violet-500/10 text-slate-700 dark:text-neutral-300 rounded-xl font-semibold min-w-12"
                }
              >
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="lg"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="border-emerald-200 dark:border-violet-400/40 hover:bg-emerald-50 dark:hover:bg-violet-500/10 text-slate-700 dark:text-neutral-300 disabled:opacity-50 rounded-xl font-semibold px-6"
      >
        Next
        <ChevronRight className="h-5 w-5 ml-2" />
      </Button>
    </div>
  );
}
