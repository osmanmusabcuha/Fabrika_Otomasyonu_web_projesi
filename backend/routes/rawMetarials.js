import express from "express";
import {
  getRawMetarials,
  getRawMetarial,
  addRawMetarial,
  updateRawMetarial,
  deleteRawMetarial,
} from "../controllers/rawMetarial.js";

const router = express.Router();

router.get("/", getRawMetarials);
router.get("/:id", getRawMetarial);
router.post("/", addRawMetarial);
router.put("/:id", updateRawMetarial);
router.delete("/:id", deleteRawMetarial);

export default router;
