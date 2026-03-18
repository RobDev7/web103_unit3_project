import { pool } from "../config/database.js";

export const getAllLocations = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM locations ORDER BY name");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLocationBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query("SELECT * FROM locations WHERE slug = $1", [slug]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Location not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
