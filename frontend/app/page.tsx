"use client";

import { useState, useCallback } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ResultsSection } from "@/components/results-section";
import { ClinicsSection } from "@/components/clinics-section";
import { Disclaimer } from "@/components/disclaimer";
import { Footer } from "@/components/footer";

export default function Page() {
  const [uploadedImage, setUploadedImage] = useState<{
    file: File;
    preview: string;
  } | null>(null);
  
  const [prediction, setPrediction] = useState<{
    disease: string;
    confidence: number;
    description: string;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = useCallback(async (file: File) => {
    const preview = URL.createObjectURL(file);
    setUploadedImage({ file, preview });
    setPrediction(null); 
    setIsAnalyzing(true);

    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    try {
      const formData = new FormData();
      formData.append("file", file); 

      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Analysis failed");

      const data = await response.json();
      setPrediction({
        disease: data.disease,
        confidence: data.confidence,
        description: data.description,
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to analyze image. Please check if the backend is running.");
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    if (uploadedImage?.preview) {
      URL.revokeObjectURL(uploadedImage.preview);
    }
    setUploadedImage(null);
    setPrediction(null);
    setIsAnalyzing(false);

    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  }, [uploadedImage]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <div id="upload">
          <HeroSection onImageUpload={handleImageUpload} />
        </div>

        {uploadedImage && (
          <div id="results">
            <ResultsSection
              imagePreview={uploadedImage.preview}
              fileName={uploadedImage.file.name}
              prediction={prediction?.disease} 
              confidence={prediction?.confidence}
              description={prediction?.description} 
              isLoading={isAnalyzing} 
              onReset={handleReset}
            />
          </div>
        )}

        <ClinicsSection />
        <Disclaimer />
      </main>

      <Footer />
    </div>
  );
}