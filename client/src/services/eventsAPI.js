const API_URL = "http://localhost:3000/api";

export const getEventsByLocationSlug = async (slug) => {
  const response = await fetch(`${API_URL}/events/${slug}`);
  return response.json();
};
