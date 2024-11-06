import expressAsyncHandler from "express-async-handler";
import Category, { ICategory } from "../models/categoryModel.js";
import { Request, Response } from "express";

// @desc    Create category
// @route   POST /api/category
// @access  Private
export const createCategory = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { title } = req.body;

    if (!title) {
      res.status(400);
      throw new Error("Title is required");
    }

    // try {
    //   const existingCategory = await Category.findOne({ title });
    // } catch (error) {
    //   console.log(error);
    // }

    // if (existingCategory) {
    //   res.status(400);
    //   throw new Error("Category with this title already exists");
    // }
    console.log(title);

    const category = await Category.create({ title });
    console.log(category);
    res.status(201).json(category);
  }
);

// @desc    Get categories
// @route   GET /api/category
// @access  Private
export const getCategories = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const categories: ICategory[] = await Category.find().sort({ title: 1 });
    res.status(200).json(categories);
  }
);
