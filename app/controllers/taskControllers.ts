import { Request, Response } from "express";
import Task from "../models/taskModel.js";

import expressAsyncHandler from "express-async-handler";
import { ITask } from "../models/taskModel.js";

import mongoose from "mongoose";

// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
export const getTasks = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { category_id, status, search } = req.query;
    const filter: any = {};

    if (category_id) {
      filter.category_id = mongoose.Types.ObjectId.createFromHexString(
        category_id as string
      );
    }

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.title = {
        $regex: search as string,
        $options: "i", // 'i' makes it case insensitive
      };
    }

    const tasks: ITask[] = await Task.find(filter)
      .populate("category_id", "title")
      .sort({ dueDate: 1 });

    res.status(200).json(tasks);
  }
);

// @desc    Get task
// @route   GET /api/tasks/:id
// @access  Private
export const getTask = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const task: ITask | null = await Task.findById(req.params.id).populate(
      "category_id",
      "title"
    );

    if (!task) {
      res.status(400);
      throw new Error("Task not found");
    }

    res.status(200).json(task);
  }
);

// @desc    create tasks
// @route   POST /api/tasks
// @access  Private
export const createTask = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const task: ITask = await Task.create({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      status: req.body.status,
      category_id: mongoose.Types.ObjectId.createFromHexString(
        req.body.category_id
      ),
      createdAt: req.body.createdAt,
    });

    res.status(200).json(task);
  }
);

// @desc    update task
// @route   PUT /api/task/:id
// @access  Private
export const updateTask = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const task: ITask | null = await Task.findById(req.params.id);

    if (!task) {
      res.status(400);
      throw new Error("Task not found");
    }

    const updatedTask: ITask | null = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedTask);
  }
);

// @desc    delete tasks
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const task = await Task.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      // throw new Error("Task not found");

      // .json({ message: "Task not found" });
    }

    await Task.deleteOne({ _id: id });

    res.status(200).json({ id: req.params.id });
  }
);
