import express from "express";
import { getAllLocations, getLocationBySlug } from "../controllers/locationsController.js";

const router = express.Router();
router.get("/", getAllLocations);
router.get("/:slug", getLocationBySlug);
export default router;
