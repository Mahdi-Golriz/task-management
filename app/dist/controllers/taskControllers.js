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
import Category from "../models/categoryModel.js";
import expressAsyncHandler from "express-async-handler";
// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
export const getTasks = expressAsyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield Task.find();
    res.status(200).json(tasks);
}));
// @desc    Get task
// @route   GET /api/tasks/:id
// @access  Private
export const getTask = expressAsyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield Task.findById(req.params.id);
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
        category_id: req.body.category_id,
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
// @desc    Get tasks
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = expressAsyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield Task.findById(req.params.id);
    if (!task) {
        res.status(400);
        throw new Error("Task not found");
    }
    yield Task.deleteOne();
    res.status(200).json({ id: req.params.id });
}));
// @desc    Create category
// @route   POST /api/category
// @access  Private
export const createCategoty = expressAsyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield Category.create({
        title: req.body.title,
    });
    res.status(200).json(category);
}));
// @desc    Get category
// @route   GET /api/tasks?category=
// @access  Private
// export const getCategory = expressAsyncHandler(
//   async (req: Request, res: Response): Promise<void> => {
//     const category = req.query.category as
//       | "Work"
//       | "Personal"
//       | "Urgent"
//       | undefined;
//     if (!category) {
//       res.status(400).json({ message: "Category query parameter is required" });
//       return;
//     }
//     const requestedTasks: ITask[] = await Task.find({ category });
//     res.status(200).json(requestedTasks);
//   }
// );
