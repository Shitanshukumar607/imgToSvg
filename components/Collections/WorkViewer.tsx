"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Work } from "@/types/work";
import { AnimatePresence, motion } from "framer-motion";
import { Code, Download, X, Copy } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

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
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (isOpen && event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!work) return null;

  const handleDownload = () => {
    if (work.svg_data && onDownload) {
      onDownload(work);
    }
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!work?.svg_data) return;

    const text = work.svg_data;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return;
    } catch (e) {
      console.error("Copy failed", e);
    }
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
                  <CardTitle className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-neutral-100">
                    {work.title}
                  </CardTitle>
                  {work.description && (
                    <CardDescription className="text-sm text-slate-600 dark:text-neutral-400">
                      {work.description}
                    </CardDescription>
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
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={handleCopy}
                            size="sm"
                            variant="outline"
                            className="bg-slate-50 hover:bg-slate-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-200 rounded-md px-3 py-2 text-sm"
                          >
                            <Copy className="mr-1 h-4 w-4" />
                            {copied ? "Copied!" : "Copy"}
                          </Button>

                          <Button
                            onClick={handleDownload}
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white rounded-md px-4 py-2 text-sm"
                          >
                            <Download className="mr-1 h-4 w-4" />
                            Download
                          </Button>
                        </div>
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
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
