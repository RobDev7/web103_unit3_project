const API_URL = "http://localhost:3000/api";

export async function getAllLocations() {
  const response = await fetch(`${API_URL}/locations`);
  if (!response.ok) throw new Error("Failed to fetch locations");
  return response.json();
}

export async function getLocationById(id) {
  const response = await fetch(`${API_URL}/locations/${id}`);
  if (!response.ok) throw new Error("Failed to fetch location");
  return response.json();
}

const locationsAPI = { getAllLocations, getLocationById };
export default locationsAPI;
