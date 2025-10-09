"use client";

import { Work } from "@/types/work";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye, Calendar, FileImage, Code } from "lucide-react";
import { motion } from "framer-motion";
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
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-900">
          <Image
            src={work.original_image_url}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />

          {/* Status badges */}
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge variant="secondary" className="text-xs">
              <FileImage className="mr-1 h-3 w-3" />
              Original
            </Badge>
            {work.svg_data && (
              <Badge variant="default" className="text-xs">
                <Code className="mr-1 h-3 w-3" />
                SVG Ready
              </Badge>
            )}
          </div>

          {/* Action buttons */}
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleView}
              className="h-8 w-8 p-0"
            >
              <Eye className="h-4 w-4" />
            </Button>
            {work.svg_data && (
              <Button
                size="sm"
                variant="default"
                onClick={handleDownload}
                className="h-8 w-8 p-0"
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold line-clamp-1">
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
                <span className="text-green-600 dark:text-green-400 font-medium">
                  Processed
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
