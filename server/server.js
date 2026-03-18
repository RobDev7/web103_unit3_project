import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import locationsRoutes from "./routes/locationsRoutes.js";
import eventsRoutes from "./routes/eventsRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS FIXED - Allows localhost:5173 (React)
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use("/api/locations", locationsRoutes);
app.use("/api/events", eventsRoutes);

app.listen(PORT, () => {
  console.log(`🎮 Arcade Bar Server running on http://localhost:${PORT}`);
  console.log("✅ CORS enabled for React!");
});

export default app;
