"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  Copy,
  Download,
  File,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface UploadedFile {
  file: File;
  name: string;
  size: string;
  progress: number;
  preview: string;
}

interface ApiResponse {
  url: string;
  svg: string;
  success: boolean;
  error?: string;
}

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [svgResult, setSvgResult] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [uploadedFiles]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFiles = (files: FileList) => {
    const file = files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    const newFile: UploadedFile = {
      file,
      name: file.name,
      size: formatFileSize(file.size),
      progress: 0,
      preview: previewUrl,
    };

    setUploadedFiles([newFile]);
    setError(null);
    setSvgResult(null);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = () => {
    uploadedFiles.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });

    setUploadedFiles([]);
    setSvgResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) return;

    setIsUploading(true);
    setError(null);

    // Simulate progress
    const file = uploadedFiles[0];
    const updateProgress = (progress: number) => {
      setUploadedFiles([{ ...file, progress }]);
    };

    try {
      updateProgress(20);

      const formData = new FormData();
      formData.append("image", file.file);

      updateProgress(50);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      updateProgress(80);

      const data: ApiResponse = await res.json();
      console.log(data);

      updateProgress(100);

      if (data.success && data.svg) {
        setSvgResult(fixSvg(data.svg));
      } else {
        setError(data.error || "Failed to convert image to SVG");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!svgResult) return;

    try {
      await navigator.clipboard.writeText(svgResult);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const downloadSvg = () => {
    if (!svgResult) return;

    const blob = new Blob([svgResult], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted-${
      uploadedFiles[0]?.name.split(".")[0] || "image"
    }.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const fixSvg = (svg: string) => {
    // Find width and height in the <svg> tag
    const widthMatch = svg.match(/width="(\d+)"/);
    const heightMatch = svg.match(/height="(\d+)"/);

    if (widthMatch && heightMatch) {
      const width = widthMatch[1];
      const height = heightMatch[1];

      // If no viewBox exists, inject one
      if (!/viewBox=/.test(svg)) {
        svg = svg.replace(
          /<svg([^>]*)>/,
          `<svg$1 viewBox="0 0 ${width} ${height}" width="100%" height="100%">`,
        );
      } else {
        // Still normalize width/height
        svg = svg
          .replace(/width="[^"]*"/, 'width="100%"')
          .replace(/height="[^"]*"/, 'height="100%"');
      }
    }

    return svg;
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-neutral-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-neutral-100 mb-2">
              Upload and Convert Images
            </h1>
            <p className="text-slate-600 dark:text-neutral-400">
              Upload and attach files to convert them to SVG format.
            </p>
          </div>

          {/* Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              isDragActive
                ? "border-emerald-400 dark:border-violet-400 bg-emerald-50 dark:bg-violet-900/20"
                : "border-slate-300 dark:border-neutral-600 hover:border-emerald-400 dark:hover:border-violet-400"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />

            <div className="flex flex-col items-center">
              <Upload className="h-12 w-12 text-slate-400 dark:text-neutral-500 mb-4" />
              <p className="text-lg font-medium text-slate-700 dark:text-neutral-300 mb-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-emerald-600 dark:text-violet-400 hover:underline"
                >
                  Click to upload
                </button>{" "}
                or drag and drop
              </p>
              <p className="text-sm text-slate-500 dark:text-neutral-400">
                Maximum file size 5 MB.
              </p>
            </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2"
              >
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="text-red-700 dark:text-red-400">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Uploaded Files */}
          <AnimatePresence>
            {uploadedFiles.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 p-4 border border-slate-200 dark:border-neutral-600 rounded-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <File className="h-5 w-5 text-slate-500 dark:text-neutral-400" />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-neutral-100">
                        {file.name}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-neutral-400">
                        {file.size}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className="text-slate-400 hover:text-slate-600 dark:text-neutral-500 dark:hover:text-neutral-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Image Preview */}
                <div className="mb-4">
                  <div className="bg-slate-100 dark:bg-neutral-700 rounded-lg p-4 flex items-center justify-center min-h-[200px]">
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="max-w-full max-h-64 object-contain rounded-lg shadow-sm"
                    />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 mt-2 text-center">
                    Original Image Preview
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 dark:bg-neutral-600 rounded-full h-2 mb-2">
                  <div
                    className="bg-emerald-500 dark:bg-violet-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${file.progress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-neutral-400">
                    {file.progress}%
                  </span>
                  {file.progress === 100 && !isUploading && (
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {uploadedFiles.length > 0 && !svgResult && (
            <div className="mt-6 flex gap-3">
              <Button onClick={removeFile} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 dark:bg-violet-600 dark:hover:bg-violet-700"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Converting...
                  </>
                ) : (
                  "Convert to SVG"
                )}
              </Button>
            </div>
          )}

          {/* SVG Result */}
          <AnimatePresence>
            {svgResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-neutral-100 mb-4">
                  🎉 SVG Generated Successfully!
                </h3>

                {/* SVG Preview and Code Side by Side */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {/* SVG Preview */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-slate-700 dark:text-neutral-300">
                      SVG Preview
                    </h4>
                    <div className="bg-white dark:bg-neutral-700 border-2 border-dashed border-slate-200 dark:border-neutral-600 rounded-lg p-2 flex items-center justify-center min-h-[250px] relative overflow-hidden">
                      {/* Checkerboard background for transparency */}
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage: `
                            linear-gradient(45deg, #ccc 25%, transparent 25%), 
                            linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                            linear-gradient(45deg, transparent 75%, #ccc 75%), 
                            linear-gradient(-45deg, transparent 75%, #ccc 75%)
                          `,
                          backgroundSize: "20px 20px",
                          backgroundPosition:
                            "0 0, 0 10px, 10px -10px, -10px 0px",
                        }}
                      />
                      <div
                        className="max-w-full max-h-full relative z-10 flex items-center justify-center"
                        dangerouslySetInnerHTML={{ __html: svgResult }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 text-center">
                      Generated SVG Vector
                    </p>
                  </div>

                  {/* SVG Code */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-slate-700 dark:text-neutral-300">
                      SVG Code
                    </h4>
                    <div className="bg-slate-50 dark:bg-neutral-800 rounded-lg p-4 border border-slate-200 dark:border-neutral-600">
                      <pre className="text-xs text-slate-700 dark:text-neutral-300 overflow-auto whitespace-pre-wrap max-h-[230px] leading-relaxed">
                        {svgResult}
                      </pre>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 text-center">
                      Raw SVG Source Code
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="flex-1"
                  >
                    {copySuccess ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy Code
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={downloadSvg}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 dark:bg-violet-600 dark:hover:bg-violet-700"
                  >
                    <Download className="h-4 w-4" />
                    Download SVG
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">
                      <span className="font-medium">Success!</span> Your image
                      has been converted to a scalable SVG vector. The SVG can
                      be resized without losing quality and is perfect for web
                      use.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
