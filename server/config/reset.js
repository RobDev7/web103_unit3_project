import { pool } from "./database.js";

const resetDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        location_id INTEGER REFERENCES locations(id),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        event_date TIMESTAMP NOT NULL
      );
    `);

    await pool.query("DELETE FROM events");
    await pool.query("DELETE FROM locations");

    const locations = await pool.query(`
      INSERT INTO locations (name, slug) VALUES
      ('🎮 Arcade Haven - NYC', 'nyc'),
      ('🎯 Pixel Palace - LA', 'la'), 
      ('⚡ Retro Realm - Chicago', 'chicago'),
      ('🎰 Game Grid - Miami', 'miami')
      RETURNING id, name, slug
    `);

    await pool.query(`
      INSERT INTO events (location_id, title, description, event_date) VALUES
      (${locations.rows[0].id}, 'Pac-Man Tournament', 'Classic showdown at NYC!', '2026-03-25 19:00:00'),
      (${locations.rows[0].id}, '🔥 RETRO GAME NIGHT', 'Donkey Kong classics! (PAST EVENT)', '2026-03-01 19:00:00'),
      (${locations.rows[1].id}, 'Street Fighter Pro Night', 'Pro players battle!', '2026-03-20 20:00:00'),
      (${locations.rows[2].id}, 'Pinball Competition', 'High score showdown!', '2026-03-22 18:00:00'),
      (${locations.rows[3].id}, 'DDR Dance Battle', 'Dance Dance Revolution!', '2026-03-28 21:00:00')
    `);

    console.log("✅ RESET COMPLETE! Past event added to NYC!");
    console.log("NYC now has: Pac-Man (future) + Retro Game Night (PAST)");
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    pool.end();
  }
};

resetDB();
