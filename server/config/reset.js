import { pool } from "./database.js";

// Delete old data first
await pool.query("DROP TABLE IF EXISTS events CASCADE");
await pool.query("DROP TABLE IF EXISTS locations CASCADE");

// Create locations table
await pool.query(`
  CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    city VARCHAR(100),
    image_url VARCHAR(500)
  )
`);

// Create events table
await pool.query(`
  CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    location_id INTEGER REFERENCES locations(id),
    title VARCHAR(200),
    date_time TIMESTAMP,
    description TEXT
  )
`);

// Insert sample locations
await pool.query(`
  INSERT INTO locations (name, city, image_url) VALUES
  ('Chicago Neon', 'Chicago, IL', 'https://images.unsplash.com/photo-xxx'),
  ('NYC Pixel Palace', 'New York, NY', 'https://images.unsplash.com/photo-yyy'),
  ('LA Retro Lounge', 'Los Angeles, CA', 'https://images.unsplash.com/photo-zzz'),
  ('Austin 8Bit', 'Austin, TX', 'https://images.unsplash.com/photo-aaa')
`);

// Insert sample events
await pool.query(`
  INSERT INTO events (location_id, title, date_time, description) VALUES
  (1, 'Pac-Man Tournament', '2026-03-20 19:00', 'High score showdown!'),
  (1, 'Pinball Night', '2026-03-25 21:00', 'Free play + prizes'),
  (2, 'Street Fighter Pro', '2026-03-18 20:00', 'Watch the champs'),
  (3, 'Galaga Marathon', '2026-03-22 18:00', '24hr endurance')
`);

console.log("✅ Arcade Bar database ready!");
