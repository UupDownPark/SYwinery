import { Router } from "express";
import wineRouter from "./wine.route";

export const router = Router();

router.use("/wines", wineRouter);

router.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "sywinery-backend",
    time: new Date().toISOString(),
  });
});
