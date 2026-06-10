"use client";

import { useCallback, useEffect, useState } from "react";
import type { PlantHistoryRecord } from "@/domains/plant-id/types";
import {
  fetchPlantHistory,
  togglePlantHistoryVerified,
  updatePlantHistoryLocation,
} from "@/domains/plant-id/services/historyService";

export function usePlantHistory() {
  const [plants, setPlants] = useState<PlantHistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPlants = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchPlantHistory();
      setPlants(data);
    } catch (err) {
      console.error("Failed to load plant history", err);
      setError(err instanceof Error ? err.message : "Failed to load plant history.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadPlants();
  }, [loadPlants]);

  const markVerified = useCallback(
    async (id: number, current: boolean) => {
      const error = await togglePlantHistoryVerified(id, current);
      if (!error) {
        setPlants((prev) =>
          prev.map((plant) =>
            plant.id === id ? { ...plant, verified: !current } : plant
          )
        );
      }
      return error;
    },
    []
  );

  const addLocation = useCallback(async (id: number) => {
    if (!navigator.geolocation) {
      throw new Error("Geolocation not supported on this device.");
    }

    return new Promise<void>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const error = await updatePlantHistoryLocation(id, latitude, longitude);

          if (!error) {
            setPlants((prev) =>
              prev.map((plant) =>
                plant.id === id ? { ...plant, latitude, longitude } : plant
              )
            );
          }

          resolve();
        },
        (geoError) => {
          reject(new Error(geoError.message));
        }
      );
    });
  }, []);

  return {
    plants,
    loading,
    error,
    loadPlants,
    markVerified,
    addLocation,
  };
}
