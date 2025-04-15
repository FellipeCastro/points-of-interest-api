import { Router } from "express";
import PoiController from "./controllers/PoiController.js";

const router = Router();

router.post("/nextpois", PoiController.ListByProximity);
router.get("/poi", PoiController.List);
router.post("/poi", PoiController.Insert);
router.delete("/poi/:id", PoiController.Delete);

export default router;
