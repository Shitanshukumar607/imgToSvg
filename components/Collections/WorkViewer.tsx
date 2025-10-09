"use client";

import { Work } from "@/types/work";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Download, FileImage, Code, Calendar, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface WorkViewerProps {
  work: Work | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload?: (work: Work) => void;
}

export function WorkViewer({
  work,
  isOpen,
  onClose,
  onDownload,
}: WorkViewerProps) {
  if (!work) return null;

  const handleDownload = () => {
    if (work.svg_data && onDownload) {
      onDownload(work);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="border-0 shadow-2xl">
              <CardHeader className="relative">
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-4 right-4 h-8 w-8 p-0"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </Button>

                <div className="pr-12">
                  <CardTitle className="text-2xl font-bold">
                    {work.title}
                  </CardTitle>
                  {work.description && (
                    <CardDescription className="text-base mt-2">
                      {work.description}
                    </CardDescription>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary" className="text-sm">
                    <FileImage className="mr-2 h-4 w-4" />
                    Original Image
                  </Badge>
                  {work.svg_data && (
                    <Badge variant="default" className="text-sm">
                      <Code className="mr-2 h-4 w-4" />
                      SVG Available
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Original Image */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <FileImage className="h-5 w-5" />
                      Original Image
                    </h3>
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={work.original_image_url}
                        alt={work.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  {/* SVG Preview */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        SVG Output
                      </h3>
                      {work.svg_data && (
                        <Button onClick={handleDownload} size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download SVG
                        </Button>
                      )}
                    </div>

                    <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      {work.svg_data ? (
                        <div
                          className="w-full h-full"
                          dangerouslySetInnerHTML={{ __html: work.svg_data }}
                        />
                      ) : (
                        <div className="text-center text-muted-foreground">
                          <Code className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>SVG conversion in progress...</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <h4 className="text-md font-semibold mb-3">Work Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Created:</span>
                      <span>{formatDate(work.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Updated:</span>
                      <span>{formatDate(work.updated_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">ID:</span>
                      <span className="font-mono text-xs">{work.id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileImage className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Status:</span>
                      <span
                        className={
                          work.svg_data
                            ? "text-green-600 dark:text-green-400"
                            : "text-amber-600 dark:text-amber-400"
                        }
                      >
                        {work.svg_data ? "Processed" : "Processing"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
