import express from "express";
import { getAllLocations, getLocationById } from "../controllers/locationsController.js";

const router = express.Router();

// Routes to get all locations and a single location by ID
router.get("/locations", getAllLocations);
router.get("/locations/:id", getLocationById);

export default router;
