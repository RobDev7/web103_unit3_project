import express from "express";
import { getEventsByLocation } from "../controllers/eventsController.js";

const router = express.Router();

// Route to get events by location ID
router.get("/locations/:locationId/events", getEventsByLocation);

export default router;
