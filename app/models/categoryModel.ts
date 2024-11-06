import mongoose, { Document, Schema, Model, ObjectId } from "mongoose";

interface ICategory extends Document {
  title: String;
}

const categorySchema: Schema<ICategory> = new Schema({
  title: {
    type: String,
    required: [true, "Please add a category title!"],
    unique: true,
    trim: true,
    maxLength: [50, "Category title cannot exceed 50 characters"],
  },
});

const Category: Model<ICategory> = mongoose.model<ICategory>(
  "Category",
  categorySchema
);

export default Category;
export type { ICategory };
