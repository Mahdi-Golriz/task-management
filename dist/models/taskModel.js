import mongoose, { Schema } from "mongoose";
// Define the Mongoose schema for the `Task` collection
const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please add a title!"],
        trim: true,
        maxLength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, "Description cannot exceed 500 characters"],
    },
    dueDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value >= new Date(); // Ensures due date is not in the past
            },
            message: "Due date cannot be in the past",
        },
    },
    status: {
        type: String,
        enum: ["Done", "Planned", "Pending"],
        default: "Planned",
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the category document
        ref: "Category",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
// Add index for better query performance
taskSchema.index({ category_id: 1 }); // Indexing category_id to optimize queries involving category-based filtering
taskSchema.index({ status: 1 }); // Indexing status for optimized filtering by task status
const Task = mongoose.model("Task", taskSchema);
export default Task;
