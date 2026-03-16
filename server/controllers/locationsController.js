import { pool } from "../config/database.js";

// Get all locations
export async function getAllLocations(req, res) {
  try {
    const result = await pool.query("SELECT * FROM locations ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.error("Error getting locations:", error);
    res.status(500).json({ error: "Server error getting locations" });
  }
}

// Get location by ID
export async function getLocationById(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM locations WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Location not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error getting location:", error);
    res.status(500).json({ error: "Server error getting location" });
  }
}
