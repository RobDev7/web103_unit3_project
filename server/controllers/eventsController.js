import { pool } from "../config/database.js";

// Get all events
export async function getAllEvents(req, res) {
  try {
    const result = await pool.query(`
      SELECT events.*, locations.name AS location_name
      FROM events
      JOIN locations ON events.location_id = locations.id
      ORDER BY date_time
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error getting events:", error);
    res.status(500).json({ error: "Server error getting events" });
  }
}

// Get events by location ID
export async function getEventsByLocation(req, res) {
  try {
    const { locationId } = req.params;
    const result = await pool.query("SELECT * FROM events WHERE location_id = $1 ORDER BY date_time", [locationId]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error getting events for location:", error);
    res.status(500).json({ error: "Server error getting events for location" });
  }
}
