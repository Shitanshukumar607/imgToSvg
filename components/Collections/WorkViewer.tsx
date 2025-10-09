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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative max-w-5xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="border shadow-lg bg-white dark:bg-neutral-900 rounded-lg overflow-hidden">
              <CardHeader className="relative bg-gradient-to-r from-emerald-50/50 to-emerald-100/30 dark:from-violet-900/10 dark:to-violet-800/5 p-6">
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-4 right-4 h-8 w-8 p-0 bg-white dark:bg-neutral-800 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 rounded-md"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </Button>

                <div className="pr-12">
                  <CardTitle className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-neutral-100 mb-2">
                    {work.title}
                  </CardTitle>
                  {work.description && (
                    <CardDescription className="text-sm text-slate-600 dark:text-neutral-400">
                      {work.description}
                    </CardDescription>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge className="text-xs px-3 py-1 bg-white dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 rounded-md">
                    <FileImage className="mr-1 h-3 w-3" />
                    Original Image
                  </Badge>
                  {work.svg_data && (
                    <Badge className="text-xs px-3 py-1 bg-emerald-100 dark:bg-violet-900/50 text-emerald-700 dark:text-violet-300 rounded-md">
                      <Code className="mr-1 h-3 w-3" />
                      SVG Available
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Original Image */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-neutral-100 flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 dark:bg-violet-500 rounded-full"></div>
                      Original Image
                    </h3>
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-50 dark:bg-neutral-800 border">
                      <Image
                        src={work.original_image_url}
                        alt={work.title}
                        fill
                        className="object-contain p-3"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  {/* SVG Preview */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-neutral-100 flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 dark:bg-violet-500 rounded-full"></div>
                        SVG Output
                      </h3>
                      {work.svg_data && (
                        <Button 
                          onClick={handleDownload} 
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white rounded-md px-4 py-2 text-sm"
                        >
                          <Download className="mr-1 h-4 w-4" />
                          Download
                        </Button>
                      )}
                    </div>

                    <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-50 dark:bg-neutral-800 border flex items-center justify-center">
                      {work.svg_data ? (
                        <div
                          className="w-full h-full p-3 flex items-center justify-center"
                          dangerouslySetInnerHTML={{ __html: work.svg_data }}
                        />
                      ) : (
                        <div className="text-center text-slate-600 dark:text-neutral-400">
                          <Code className="h-12 w-12 mx-auto mb-2 text-emerald-500 dark:text-violet-500 opacity-60" />
                          <p className="text-sm">Processing...</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="mt-8 p-4 bg-slate-50/50 dark:bg-neutral-800/50 rounded-lg border">
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-neutral-100 mb-4">Work Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-900 rounded-md border">
                      <Calendar className="h-4 w-4 text-emerald-600 dark:text-violet-500" />
                      <div>
                        <span className="text-slate-600 dark:text-neutral-400 text-sm">Created:</span>
                        <p className="text-sm font-medium text-slate-900 dark:text-neutral-100">{formatDate(work.created_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-900 rounded-md border">
                      <Calendar className="h-4 w-4 text-emerald-600 dark:text-violet-500" />
                      <div>
                        <span className="text-slate-600 dark:text-neutral-400 text-sm">Updated:</span>
                        <p className="text-sm font-medium text-slate-900 dark:text-neutral-100">{formatDate(work.updated_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-900 rounded-md border">
                      <User className="h-4 w-4 text-emerald-600 dark:text-violet-500" />
                      <div>
                        <span className="text-slate-600 dark:text-neutral-400 text-sm">ID:</span>
                        <p className="font-mono text-xs font-medium text-slate-900 dark:text-neutral-100">{work.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-900 rounded-md border">
                      <FileImage className="h-4 w-4 text-emerald-600 dark:text-violet-500" />
                      <div>
                        <span className="text-slate-600 dark:text-neutral-400 text-sm">Status:</span>
                        <div className="flex items-center gap-2">
                          {work.svg_data ? (
                            <>
                              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Processed</span>
                            </>
                          ) : (
                            <>
                              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                              <span className="text-sm font-medium text-amber-600 dark:text-amber-400">Processing</span>
                            </>
                          )}
                        </div>
                      </div>
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
