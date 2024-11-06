import express from "express";
const router = express.Router();
import { getTasks, getTask, updateTask, deleteTask, createTask, } from "../controllers/taskControllers.js";
router.route("/").get(getTasks).post(createTask);
router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);
export default router;
