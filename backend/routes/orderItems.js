import express from "express";
import {
  getOrderItems,
  getOrderItem,
  addOrderItem,
  updateOrderItem,
  deleteOrderItem
} from "../controllers/orderItem.js";

const router = express.Router();

router.get("/", getOrderItems);
router.get("/:id", getOrderItem);
router.post("/", addOrderItem);
router.put("/:id", updateOrderItem);
router.delete("/:id", deleteOrderItem);
export default router;