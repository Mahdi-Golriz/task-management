var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Task from "../models/taskModel.js";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
export const getTasks = expressAsyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category_id, status, search } = req.query;
    const filter = {};
    if (category_id) {
        filter.category_id = mongoose.Types.ObjectId.createFromHexString(category_id);
    }
    if (status) {
        filter.status = status;
    }
    if (search) {
        filter.title = {
            $regex: search,
            $options: "i", // 'i' makes it case insensitive
        };
    }
    const tasks = yield Task.find(filter)
        .populate("category_id", "title")
        .sort({ dueDate: 1 });
    res.status(200).json(tasks);
}));
// @desc    Get task
// @route   GET /api/tasks/:id
// @access  Private
export const getTask = expressAsyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield Task.findById(req.params.id).populate("category_id", "title");
    if (!task) {
        res.status(400);
        throw new Error("Task not found");
    }
    res.status(200).json(task);
}));
// @desc    create tasks
// @route   POST /api/tasks
// @access  Private
export const createTask = expressAsyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield Task.create({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        status: req.body.status,
        category_id: mongoose.Types.ObjectId.createFromHexString(req.body.category_id),
        createdAt: req.body.createdAt,
    });
    res.status(200).json(task);
}));
// @desc    update task
// @route   PUT /api/task/:id
// @access  Private
export const updateTask = expressAsyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield Task.findById(req.params.id);
    if (!task) {
        res.status(400);
        throw new Error("Task not found");
    }
    const updatedTask = yield Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(200).json(updatedTask);
}));
// @desc    delete tasks
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = expressAsyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const task = yield Task.findById(id);
    if (!task) {
        res.status(404).json({ message: "Task not found" });
        // throw new Error("Task not found");
        // .json({ message: "Task not found" });
    }
    yield Task.deleteOne({ _id: id });
    res.status(200).json({ id: req.params.id });
}));
