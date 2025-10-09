"use client";

import { Work } from "@/types/work";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Filter, Check, Calendar, FileImage, Code } from "lucide-react";

type FilterOption = "all" | "processed" | "processing" | "recent" | "oldest";

interface WorksFilterProps {
  currentFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  worksCount: {
    all: number;
    processed: number;
    processing: number;
  };
}

export function WorksFilter({
  currentFilter,
  onFilterChange,
  worksCount,
}: WorksFilterProps) {
  const filterOptions = [
    {
      value: "all" as FilterOption,
      label: "All Works",
      count: worksCount.all,
      icon: FileImage,
    },
    {
      value: "processed" as FilterOption,
      label: "SVG Ready",
      count: worksCount.processed,
      icon: Code,
    },
    {
      value: "processing" as FilterOption,
      label: "Processing",
      count: worksCount.processing,
      icon: FileImage,
    },
    {
      value: "recent" as FilterOption,
      label: "Recently Added",
      icon: Calendar,
    },
    { value: "oldest" as FilterOption, label: "Oldest First", icon: Calendar },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="lg" 
          className="flex items-center gap-2 border-emerald-200 dark:border-violet-400/40 hover:bg-emerald-50 dark:hover:bg-violet-500/10 hover:border-emerald-300 dark:hover:border-violet-400 text-slate-700 dark:text-neutral-300 py-3 px-6 rounded-xl font-semibold backdrop-blur-sm"
        >
          <Filter className="h-5 w-5" />
          Filter & Sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm border-emerald-200/50 dark:border-violet-500/30 rounded-2xl shadow-2xl p-2">
        <DropdownMenuLabel className="text-lg font-bold text-slate-900 dark:text-neutral-100 px-3 py-3">Filter & Sort</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-emerald-200/50 dark:bg-violet-500/30" />

        {filterOptions.map((option) => {
          const Icon = option.icon;
          const isActive = currentFilter === option.value;
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onFilterChange(option.value)}
              className={`flex items-center justify-between m-1 px-3 py-3 rounded-xl transition-all cursor-pointer ${
                isActive 
                  ? "bg-emerald-100 dark:bg-violet-700/30 text-emerald-700 dark:text-violet-300" 
                  : "hover:bg-emerald-50 dark:hover:bg-violet-700/20 text-slate-700 dark:text-neutral-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${isActive ? "text-emerald-600 dark:text-violet-400" : ""}`} />
                <span className="font-medium">{option.label}</span>
                {option.count !== undefined && (
                  <span className={`text-sm px-2 py-1 rounded-full font-semibold ${
                    isActive 
                      ? "bg-emerald-200 dark:bg-violet-600/40 text-emerald-800 dark:text-violet-200" 
                      : "bg-slate-200 dark:bg-neutral-600 text-slate-600 dark:text-neutral-400"
                  }`}>
                    {option.count}
                  </span>
                )}
              </div>
              {isActive && (
                <Check className="h-5 w-5 text-emerald-600 dark:text-violet-400" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function applyFilter(works: Work[], filter: FilterOption): Work[] {
  switch (filter) {
    case "processed":
      return works.filter((work) => work.svg_data);
    case "processing":
      return works.filter((work) => !work.svg_data);
    case "recent":
      return [...works].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    case "oldest":
      return [...works].sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    default:
      return works;
  }
}
