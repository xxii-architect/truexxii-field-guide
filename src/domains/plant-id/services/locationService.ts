export async function reverseGeocode(lat: number, lon: number) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      {
        headers: {
          "User-Agent": "TrueXXII-PlantID-App"
        }
      }
    );

    const data = await res.json();

    return data.display_name || null;
  } catch (e) {
    void e
    return null
  }
}
