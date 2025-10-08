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

  const handleFiles = useCallback(
    (files: FileList) => {
      const file = files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

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
    },
    [setError, setUploadedFiles, setSvgResult]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragActive(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFiles(files);
      }
    },
    [handleFiles]
  );

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
    // get width/height
    const widthMatch = svg.match(/width="(\d+)"/);
    const heightMatch = svg.match(/height="(\d+)"/);

    if (widthMatch && heightMatch) {
      const width = widthMatch[1];
      const height = heightMatch[1];

      // make width/height to 100%
      svg = svg
        .replace(/width="[^"]*"/, 'width="100%"')
        .replace(/height="[^"]*"/, 'height="100%"');

      // add viewBox if missing
      if (!/viewBox=/.test(svg)) {
        svg = svg.replace(
          /<svg([^>]*)>/,
          `<svg$1 viewBox="0 0 ${width} ${height}">`
        );
      }
    }

    return svg;
  };

  return (
    <section className="relative overflow-hidden bg-zinc-50 dark:bg-neutral-900/80 min-h-screen py-12 px-4">
      {/* Accent Corner Lines */}
      <div className="hidden sm:block absolute top-10 left-10 h-16 w-16 border-t-2 border-l-2 border-emerald-400 dark:border-violet-500 opacity-60 rounded-tl-lg" />
      <div className="hidden sm:block absolute bottom-10 right-10 h-20 w-20 border-b-2 border-r-2 border-emerald-400 dark:border-violet-500 opacity-60 rounded-br-lg" />

      {/* Geometric Shape Decorations */}
      <div className="absolute top-1/4 -left-6 w-24 h-24 border border-emerald-300 dark:border-violet-400/40 rounded-full opacity-30" />
      <div className="absolute bottom-1/3 -right-8 w-20 h-20 border border-emerald-300 dark:border-violet-400/40 rotate-12 opacity-30" />
      <div className="absolute top-2/3 right-1/4 w-16 h-16 border-2 border-emerald-200 dark:border-violet-300/30 rotate-45 opacity-20" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl shadow-xl border border-emerald-200/50 dark:border-violet-500/30 p-6 md:p-8"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 dark:bg-violet-700/30 dark:text-violet-300 text-sm font-medium px-4 py-2 rounded-full mb-6"
            >
              <Upload className="h-4 w-4" />
              <span>Image to SVG Converter</span>
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-neutral-100 mb-4 tracking-tight">
              Transform Images to
              <span className="text-emerald-600 dark:text-violet-500">
                {" "}
                Scalable Vectors
              </span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Convert your PNG, JPG, and other raster images into crisp,
              scalable SVG vectors with just a few clicks.
            </p>
          </div>

          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className={`relative border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-all duration-300 ${
              isDragActive
                ? "border-emerald-400 dark:border-violet-400 bg-emerald-50 dark:bg-violet-900/20 scale-[1.02]"
                : "border-slate-300 dark:border-neutral-600 hover:border-emerald-400 dark:hover:border-violet-400 hover:bg-emerald-50/50 dark:hover:bg-violet-900/10"
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
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-emerald-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center mb-6"
              >
                <Upload className="h-8 w-8 text-emerald-600 dark:text-violet-400" />
              </motion.div>
              <p className="text-xl font-medium text-slate-700 dark:text-neutral-300 mb-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-emerald-600 dark:text-violet-400 hover:text-emerald-700 dark:hover:text-violet-300 transition-colors font-semibold"
                >
                  Click to upload
                </button>{" "}
                or drag and drop
              </p>
              <p className="text-sm text-slate-500 dark:text-neutral-400 mb-2">
                Supported formats: PNG, JPG, JPEG, GIF, BMP
              </p>
              <p className="text-xs text-slate-400 dark:text-neutral-500">
                Maximum file size: 5 MB
              </p>
            </div>
          </motion.div>

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
                className="mt-6 p-6 border border-emerald-200/50 dark:border-violet-500/30 bg-white/50 dark:bg-neutral-800/50 rounded-xl shadow-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center">
                      <File className="h-5 w-5 text-emerald-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-neutral-100 text-lg">
                        {file.name}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-neutral-400 font-medium">
                        {file.size}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={removeFile}
                    className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                </div>

                {/* Image Preview */}
                <div className="mb-6">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-neutral-700 dark:to-neutral-800 rounded-xl p-6 flex items-center justify-center min-h-[250px] border border-slate-200/50 dark:border-neutral-600/50">
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="max-w-full max-h-72 object-contain rounded-lg shadow-lg"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-sm text-slate-600 dark:text-neutral-400 mt-3 text-center font-medium">
                    📸 Original Image Preview
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-3">
                  <div className="w-full bg-slate-200 dark:bg-neutral-600 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-violet-500 dark:to-violet-600 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${file.progress}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${file.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-600 dark:text-neutral-400">
                      {file.progress === 0
                        ? "Ready to convert"
                        : file.progress < 100
                        ? `Converting... ${file.progress}%`
                        : "Conversion complete!"}
                    </span>
                    {file.progress === 100 && !isUploading && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      >
                        <CheckCircle className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {uploadedFiles.length > 0 && !svgResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={removeFile}
                variant="outline"
                className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700 py-3"
                size="lg"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 dark:from-violet-600 dark:to-violet-700 dark:hover:from-violet-700 dark:hover:to-violet-800 text-white shadow-lg py-3"
                size="lg"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Converting...
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5 mr-2" />
                    Convert to SVG
                  </>
                )}
              </Button>
            </motion.div>
          )}

          {/* SVG Result */}
          <AnimatePresence>
            {svgResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-16 h-16 bg-emerald-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-violet-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-neutral-100 mb-2">
                    🎉 Conversion Successful!
                  </h3>
                  <p className="text-slate-600 dark:text-neutral-400">
                    Your image has been transformed into a scalable SVG vector
                  </p>
                </div>

                {/* SVG Preview and Code Side by Side */}
                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                  {/* SVG Preview */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-neutral-200 flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 dark:bg-violet-500 rounded-full"></div>
                      Generated SVG Preview
                    </h4>
                    <div className="bg-gradient-to-br from-white to-slate-50 dark:from-neutral-700 dark:to-neutral-800 border-2 border-dashed border-emerald-200 dark:border-violet-400/40 rounded-xl p-6 flex items-center justify-center min-h-[300px] relative overflow-hidden shadow-inner">
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
                  </motion.div>

                  {/* SVG Code */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-neutral-200 flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 dark:bg-violet-500 rounded-full"></div>
                      Raw SVG Code
                    </h4>
                    <div className="bg-slate-50 dark:bg-neutral-800 rounded-xl p-6 border border-slate-200 dark:border-neutral-600 shadow-inner">
                      <pre className="text-sm text-slate-700 dark:text-neutral-300 overflow-auto whitespace-pre-wrap max-h-[280px] leading-relaxed font-mono">
                        {svgResult}
                      </pre>
                    </div>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="flex-1 border-emerald-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 dark:border-violet-400/40 dark:text-neutral-300 dark:hover:bg-violet-500/10 dark:hover:border-violet-400 py-3"
                    size="lg"
                  >
                    {copySuccess ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-5 w-5 mr-2" />
                        Copy Code
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={downloadSvg}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 dark:from-violet-600 dark:to-violet-700 dark:hover:from-violet-700 dark:hover:to-violet-800 text-white shadow-lg py-3"
                    size="lg"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download SVG
                  </Button>
                </motion.div>

                {/* Additional Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 p-6 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-700/50 rounded-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-800/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-2">
                        🚀 Conversion Complete!
                      </h4>
                      <p className="text-sm text-emerald-700 dark:text-emerald-300 leading-relaxed">
                        Your image has been successfully converted to a scalable
                        SVG vector. The generated SVG can be resized infinitely
                        without losing quality, making it perfect for responsive
                        web design, logos, and high-DPI displays.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
