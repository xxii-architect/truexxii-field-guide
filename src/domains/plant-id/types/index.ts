export type PlantHistoryRecord = {
  id: number;
  species: string | null;
  plant_name: string;
  description: string;
  image_url: string;
  verified: boolean;
  latitude?: number;
  longitude?: number;
  created_at?: string;
};

export type MapSelection = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};
