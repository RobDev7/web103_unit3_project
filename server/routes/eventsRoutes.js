import express from "express";
import { getEventsByLocation } from "../controllers/eventsController.js";

const router = express.Router();
router.get("/:slug", getEventsByLocation);
export default router;
