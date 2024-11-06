import express from "express";
import { createCategory, getCategories, } from "../controllers/categoryControllers.js";
const router = express.Router();
router.route("/").post(createCategory).get(getCategories);
export default router;
