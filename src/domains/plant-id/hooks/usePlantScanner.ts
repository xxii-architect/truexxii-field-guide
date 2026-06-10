"use client";

import { useState } from "react";
import { identifyPlantScan, type PlantIdentificationResponse } from "@/domains/plant-id/services/scanService";

export function usePlantScanner() {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [scanData, setScanData] = useState<PlantIdentificationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const identifyPlant = async () => {
    if (!image) {
      setError("Please select an image first.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const data = await identifyPlantScan(image);
      setScanData(data);
      setResult(data.plant_name ?? data.species ?? "No result returned.");
    } catch (err) {
      console.error("Plant identification failed", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return {
    image,
    setImage,
    loading,
    result,
    scanData,
    error,
    identifyPlant,
  };
}
