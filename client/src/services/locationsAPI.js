const API_URL = "http://localhost:3000/api";

export const getAllLocations = async () => {
  const response = await fetch(`${API_URL}/locations`);
  return response.json();
};
