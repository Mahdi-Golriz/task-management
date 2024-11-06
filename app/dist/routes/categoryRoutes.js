import express from "express";
import { createCategoty } from "../controllers/taskControllers.js";
const router = express.Router();
router.route("/").post(createCategoty);
export default router;
