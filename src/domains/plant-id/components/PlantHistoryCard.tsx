"use client";

import Image from "next/image";
import Button from "@/core/components/Button";
import type { PlantHistoryRecord } from "@/domains/plant-id/types";
import { themeClasses } from "@/shared/constants/theme";

interface PlantHistoryCardProps {
  plant: PlantHistoryRecord;
  onAddLocation: () => void;
  onToggleVerified: () => void;
}

export default function PlantHistoryCard({
  plant,
  onAddLocation,
  onToggleVerified,
}: PlantHistoryCardProps) {
  return (
    <div className={themeClasses.card}>
      <Image
        src={plant.image_url}
        alt={plant.plant_name || "Plant history image"}
        width={600}
        height={360}
        className="rounded-lg mb-3 object-cover"
        unoptimized
      />
      <h2 className="text-lg font-semibold text-truexxii-green">{plant.plant_name}</h2>
      {plant.species && <p className="text-sm text-[#d6c4ab]">{plant.species}</p>}
      <p className="text-sm leading-relaxed text-white/80">{plant.description}</p>
      <div className="flex gap-2 mt-3">
        <Button variant="primary" label="Pin Location" onClick={onAddLocation} />
        <Button
          variant={plant.verified ? "success" : "neutral"}
          label={plant.verified ? "Verified" : "Mark Verified"}
          onClick={onToggleVerified}
        />
      </div>
    </div>
  );
}
