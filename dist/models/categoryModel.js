import mongoose, { Schema } from "mongoose";
const categorySchema = new Schema({
    title: {
        type: String,
        required: [true, "Please add a category title!"],
        unique: true,
        trim: true,
        maxLength: [50, "Category title cannot exceed 50 characters"],
    },
});
const Category = mongoose.model("Category", categorySchema);
export default Category;
