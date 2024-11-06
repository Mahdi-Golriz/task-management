import mongoose, { Schema } from "mongoose";
const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please add a title!"],
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["Done", "Planed", "Pending"],
        default: "Pending",
    },
    category_id: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
// var id = mongoose.Types.ObjectId("")
const Task = mongoose.model("Task", taskSchema);
export default Task;
