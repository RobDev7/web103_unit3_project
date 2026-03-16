const API_URL = "http://localhost:3000/api";

export async function getEventsByLocationId(locationId) {
  const response = await fetch(`${API_URL}/locations/${locationId}/events`);
  if (!response.ok) throw new Error("Failed to fetch events");
  return response.json();
}

const eventsAPI = { getEventsByLocationId };
export default eventsAPI;
