import mongoose, { Schema } from "mongoose";
// Define the Mongoose schema for the `Category` collection
const categorySchema = new Schema({
    title: {
        type: String,
        required: [true, "Please add a category title!"], // Validation: this field is mandatory
        unique: true, // Validation: ensures no duplicate titles in the collection
        trim: true, // Removes extra whitespace from the beginning and end
        maxLength: [50, "Category title cannot exceed 50 characters"],
    },
});
// Create a Mongoose model using the schema
const Category = mongoose.model("Category", // The model represents the 'Category' collection in the database
categorySchema);
export default Category;
