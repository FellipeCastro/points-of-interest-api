import { Router } from "express";
import RoiController from "./controllers/RoiController.js";

const router = Router();

router.post("/poi", RoiController.Insert);

export default router;
