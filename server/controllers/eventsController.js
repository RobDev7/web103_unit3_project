import { pool } from "../config/database.js";

export const getEventsByLocation = async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(
      `
      SELECT e.*, l.name as location_name 
      FROM events e 
      JOIN locations l ON e.location_id = l.id 
      WHERE l.slug = $1 
      ORDER BY e.event_date
    `,
      [slug]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
