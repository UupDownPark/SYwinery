import { Router } from "express";
import * as wineController from "../controllers/wine.controller";

const router = Router();

router.get("/", wineController.getAll);
router.post("/", wineController.create);
router.get("/:id", wineController.getOne);
router.delete("/:id", wineController.remove);

export default router;
