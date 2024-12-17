import express from "express";
import {
  getOrders,
  getOrder,
  addOrder,
  updateOrder,
  deleteOrder
} from "../controllers/order.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrder);
router.post("/", addOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder)
export default router;