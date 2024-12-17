import express from "express";
import {
    getEmployeer,
    getEmployee,
    addEmployee,
    updateEmployee,
    deleteEmployee
} from "../controllers/employee.js";

const router = express.Router();

router.get("/", getEmployeer);
router.get("/:id", getEmployee);
router.post("/", addEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;