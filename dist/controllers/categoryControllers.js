var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import expressAsyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
// @desc    Create category
// @route   POST /api/category
// @access  Private
export const createCategory = expressAsyncHandler(
//  use expressAsyncHandler to simplify async route handling and error management
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body; // get the title of category by body of request
    if (!title) {
        res.status(400);
        throw new Error("Title is required");
    }
    // check for repetitive category and prevent from create it
    try {
        const existingCategory = yield Category.findOne({ title }); // Query the database for an existing category
        if (existingCategory) {
            res.status(400);
            throw new Error("Category with this title already exists");
        }
    }
    catch (error) {
        console.log(error);
    }
    const category = yield Category.create({ title }); // Create a new category document in the database
    console.log(category);
    res.status(201).json(category);
}));
// @desc    Get categories
// @route   GET /api/category
// @access  Private
export const getCategories = expressAsyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield Category.find().sort({ title: 1 }); // sort tasks alphabetically by title
    res.status(200).json(categories);
}));
