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
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Filter & Sort</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {filterOptions.map((option) => {
          const Icon = option.icon;
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onFilterChange(option.value)}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{option.label}</span>
                {option.count !== undefined && (
                  <span className="text-xs text-muted-foreground">
                    ({option.count})
                  </span>
                )}
              </div>
              {currentFilter === option.value && <Check className="h-4 w-4" />}
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
