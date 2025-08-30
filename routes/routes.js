import express from "express";
const router = express.Router();
import passport from "passport";
import { getDashboard } from "../controllers/controller.js";

router.get("/", getDashboard);

export function mountRoutes(app) {
  app.use("/", router);
}
