import { Router } from "express";
import PoiController from "./controllers/PoiController.js";

const router = Router();

router.get("/poi", PoiController.List);
router.post("/poi", PoiController.Insert);

export default router;
