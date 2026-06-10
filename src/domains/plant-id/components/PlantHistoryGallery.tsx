"use client";

import { useState } from "react";
import type { MapSelection, PlantHistoryRecord } from "@/domains/plant-id/types";
import { usePlantHistory } from "@/domains/plant-id/hooks/usePlantHistory";
import PlantHistoryCard from "@/domains/plant-id/components/PlantHistoryCard";
import PlantLocationModal from "@/domains/plant-id/components/PlantLocationModal";
import { themeClasses } from "@/shared/constants/theme";
import { uiClasses } from "@/shared/constants/ui";

export default function PlantHistoryGallery() {
  const [selectedPlant, setSelectedPlant] = useState<MapSelection | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { plants, loading, error, markVerified, addLocation } = usePlantHistory();

  const openMap = async (plant: PlantHistoryRecord) => {
    if (plant.latitude == null || plant.longitude == null) {
      try {
        await addLocation(plant.id);
      } catch (err) {
        console.error(err);
        alert(err instanceof Error ? err.message : "Unable to add location.");
      }
      return;
    }

    setSelectedPlant({
      id: plant.id,
      name: plant.plant_name,
      latitude: plant.latitude,
      longitude: plant.longitude,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className={themeClasses.page}>
      <h1 className="text-3xl mb-6 font-bold">🌿 Plant History Gallery</h1>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : loading ? (
        <p>Loading plant history…</p>
      ) : plants.length === 0 ? (
        <p>No scans yet — go identify some plants!</p>
      ) : (
        <div className={uiClasses.historyGrid}>
          {plants.map((plant) => (
            <PlantHistoryCard
              key={plant.id}
              plant={plant}
              onAddLocation={() => openMap(plant)}
              onToggleVerified={() => void markVerified(plant.id, plant.verified)}
            />
          ))}
        </div>
      )}

      <PlantLocationModal
        key={`${selectedPlant?.id ?? "none"}-${isModalOpen}`}
        selectedPlant={selectedPlant}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </main>
  );
}
