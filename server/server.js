import express from "express";
import cors from "cors";
import locationsRouter from "./routes/locationsRoutes.js";
import eventsRouter from "./routes/eventsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Set API routes
app.use("/api", locationsRouter);
app.use("/api", eventsRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
