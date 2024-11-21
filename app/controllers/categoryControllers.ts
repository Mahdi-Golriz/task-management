import expressAsyncHandler from "express-async-handler";
import Category, { ICategory } from "../models/categoryModel.js";
import { Request, Response } from "express";

// @desc    Create category
// @route   POST /api/category
// @access  Private
export const createCategory = expressAsyncHandler(
  //  use expressAsyncHandler to simplify async route handling and error management
  async (req: Request, res: Response): Promise<void> => {
    const { title } = req.body; // get the title of category by body of request

    if (!title) {
      res.status(400);
      throw new Error("Title is required");
    }

    // check for repetitive category and prevent from create it
    try {
      const existingCategory = await Category.findOne({ title }); // Query the database for an existing category
      if (existingCategory) {
        res.status(400);
        throw new Error("Category with this title already exists");
      }
    } catch (error) {
      console.log(error);
    }

    const category = await Category.create({ title }); // Create a new category document in the database
    console.log(category);
    res.status(201).json(category);
  }
);

// @desc    Get categories
// @route   GET /api/category
// @access  Private
export const getCategories = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const categories: ICategory[] = await Category.find().sort({ title: 1 }); // sort tasks alphabetically by title
    res.status(200).json(categories);
  }
);
