import mongoose, { Document, Schema, Model } from "mongoose";

// Define the structure of a category document using interface
interface ICategory extends Document {
  // `Document` represents a MongoDB document in Mongoose
  title: String;
}

// Define the Mongoose schema for the `Category` collection
const categorySchema: Schema<ICategory> = new Schema({
  title: {
    type: String,
    required: [true, "Please add a category title!"], // Validation: this field is mandatory
    unique: true, // Validation: ensures no duplicate titles in the collection
    trim: true, // Removes extra whitespace from the beginning and end
    maxLength: [50, "Category title cannot exceed 50 characters"],
  },
});

// Create a Mongoose model using the schema
const Category: Model<ICategory> = mongoose.model<ICategory>(
  "Category", // The model represents the 'Category' collection in the database
  categorySchema
);

export default Category;
export type { ICategory };
