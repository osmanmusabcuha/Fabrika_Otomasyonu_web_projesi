import express from "express";
import {
  getProductions,
  getProduction,
  addProduction,
  deleteProduction
} from "../controllers/production.js";

const router = express.Router();

router.get("/", getProductions);
router.get("/:id", getProduction);
router.post("/", addProduction);
router.delete("/:id", deleteProduction)
export default router;