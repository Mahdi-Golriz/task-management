import mongoose, { Schema } from "mongoose";
const categorySchema = new Schema({
    title: {
        type: String,
    },
});
const Category = mongoose.model("Category", categorySchema);
export default Category;
