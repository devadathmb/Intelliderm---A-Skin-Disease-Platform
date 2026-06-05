"use client";

import React from "react"

import { useCallback, useState, useRef } from "react";

interface HeroSectionProps {
  onImageUpload: (file: File) => void;
}

export function HeroSection({ onImageUpload }: HeroSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        onImageUpload(file);
      }
    },
    [onImageUpload]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        onImageUpload(file);
      }
    },
    [onImageUpload]
  );

  return (
    <section id="upload" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 lg:px-8 lg:pb-24 lg:pt-28">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-sm font-medium text-accent-foreground">
              AI-Powered Skin Analysis
            </span>
          </div>

          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="text-balance">
              Understand Your Skin{" "}
              <span className="text-primary">With AI</span>
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Upload an image of a skin condition and receive an instant
            AI-powered preliminary assessment to help guide your next steps.
          </p>
        </div>

        {/* Upload Area */}
        <div className="mx-auto mt-12 max-w-xl">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Upload an image for skin analysis"
            className={`group cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-300 md:p-14 ${
              isDragging
                ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                : "border-border bg-card hover:border-primary/40 hover:bg-accent/50 hover:shadow-md"
            }`}
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-transform duration-300 group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-primary"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>
            </div>

            <p className="text-lg font-semibold text-foreground">
              {isDragging
                ? "Drop your image here"
                : "Drag & drop your image here"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              or click to browse files
            </p>
            <p className="mt-4 text-xs text-muted-foreground/70">
              Supports JPG, PNG, WEBP (max 10MB)
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="sr-only"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
