"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Work } from "@/types/work";
import { motion } from "framer-motion";
import { Calendar, Code, Download, Eye } from "lucide-react";
import Image from "next/image";

interface WorkCardProps {
  work: Work;
  onDownload?: (work: Work) => void;
  onView?: (work: Work) => void;
}

export function WorkCard({ work, onDownload, onView }: WorkCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDownload = () => {
    if (work.svg_data && onDownload) {
      onDownload(work);
    }
  };

  const handleView = () => {
    if (onView) {
      onView(work);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-slate-200 dark:border-neutral-700 hover:border-emerald-300 dark:hover:border-violet-400 pt-0">
        <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-neutral-800">
          <Image
            src={work.original_image_url}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/5" />

          {/* Status badges */}
          <div className="absolute top-2 left-2 flex gap-1">
            {work.svg_data && (
              <Badge className="text-xs bg-emerald-100 dark:bg-violet-900/40 text-emerald-700 dark:text-violet-300 border-0 px-2 py-1">
                <Code className="mr-1 h-3 w-3" />
                Ready
              </Badge>
            )}
          </div>

          {/* Action buttons */}
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button
              size="sm"
              onClick={handleView}
              className="h-8 w-8 p-0 bg-white/90 dark:bg-neutral-900/90 hover:bg-white dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-300 border-0 shadow-md"
            >
              <Eye className="h-4 w-4" />
            </Button>
            {work.svg_data && (
              <Button
                size="sm"
                onClick={handleDownload}
                className="h-8 w-8 p-0 bg-emerald-600 hover:bg-emerald-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white border-0 shadow-md"
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold line-clamp-1 text-slate-900 dark:text-neutral-100 group-hover:text-emerald-600 dark:group-hover:text-violet-500 transition-colors">
            {work.title}
          </CardTitle>
          {work.description && (
            <CardDescription className="line-clamp-2 text-sm">
              {work.description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(work.created_at)}
            </div>
            <div className="flex items-center gap-2">
              {work.svg_data ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  Ready
                </span>
              ) : (
                <span className="text-amber-600 dark:text-amber-400 font-medium">
                  Processing
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
