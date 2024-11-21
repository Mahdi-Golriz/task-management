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
    const { category_id, status, search, sort } = req.query;
    const filter: any = {}; // create a filter object

    // filter based on category_id
    if (category_id && category_id.length === 24) {
      filter.category_id = mongoose.Types.ObjectId.createFromHexString(
        category_id as string
      );
    }

    // filter based on status
    if (status && status !== "") {
      filter.status = status;
    }

    // filter based on search quey for title and description
    if (search) {
      // filter.title = {
      //   $regex: search as string,
      //   $options: "i", // 'i' makes it case insensitive
      // };

      filter.$or = [
        { title: { $regex: search as string, $options: "i" } }, // Search in title
        { description: { $regex: search as string, $options: "i" } }, // Search in description
      ];
    }

    // sort process
    let sortOption: { [key: string]: 1 | -1 } = {};
    switch (sort) {
      case "sortedBydueDate":
        sortOption = { dueDate: 1 }; // Sort by dueDate ascending
        break;
      case "sortedBycreationDate":
        sortOption = { createdAt: 1 }; // Sort by createdAt ascending
        break;
      default:
        // No sort or default MongoDB insertion order
        sortOption = {};
    }

    try {
      const tasks: ITask[] = await Task.find(filter).sort(sortOption); // Apply sorting
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
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
      // adding category_id as a ObjectId and make connection between two categories and tasks collection
      category_id: mongoose.Types.ObjectId.createFromHexString(
        req.body.category_id
      ),
      createdAt: req.body.createdAt,
    });

    res.status(200).json(task); // // Respond with the created task
  }
);

// @desc    update task
// @route   PUT /api/task/:id
// @access  Private
export const updateTask = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    // update method takes the taskId and new task infomations
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

// @desc    count number of tasks
// @route   GET /api/tasks/stats
// @access  Private
export const getTaskCounts = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const totalTasks = await Task.countDocuments(); // Get total number of tasks

      // Get count of tasks grouped by status
      const statusCounts = await Task.aggregate([
        {
          $group: {
            _id: "$status", // Group by the status field
            count: { $sum: 1 }, // Count the number of tasks for each status
          },
        },
      ]);

      // Build the result object
      const counts: Record<string, number> = {
        total: totalTasks,
        planned: 0,
        pending: 0,
        done: 0,
      };

      // Map the aggregated status counts to the result object
      statusCounts.forEach((statusCount) => {
        if (statusCount._id === "Planned") counts.planned = statusCount.count;
        if (statusCount._id === "Pending") counts.pending = statusCount.count;
        if (statusCount._id === "Done") counts.done = statusCount.count;
      });

      res.status(200).json(counts);
    } catch (error) {
      res.status(500).json({ error: "Failed to get task counts" });
    }
  }
);
