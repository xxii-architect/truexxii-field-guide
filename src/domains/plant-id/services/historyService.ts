import { supabase } from "@/shared/lib/supabaseClient";
import type { PlantHistoryRecord } from "@/domains/plant-id/types";

export async function fetchPlantHistory(): Promise<PlantHistoryRecord[]> {
  const { data, error } = await supabase
    .from("plant_history")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch plant history:", error);
    return [];
  }

  return data as PlantHistoryRecord[];
}

export async function togglePlantHistoryVerified(id: number, current: boolean) {
  const { error } = await supabase
    .from("plant_history")
    .update({ verified: !current })
    .eq("id", id);

  return error;
}

export async function updatePlantHistoryLocation(
  id: number,
  latitude: number,
  longitude: number
) {
  const { error } = await supabase
    .from("plant_history")
    .update({ latitude, longitude })
    .eq("id", id);

  return error;
}
