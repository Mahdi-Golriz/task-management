import mongoose, { Document, Schema, Model, ObjectId } from "mongoose";

interface ITask extends Document {
  title: string;
  description?: string;
  dueDate: Date;
  status: "Done" | "Planed" | "Pending";
  category_id: ObjectId;
  createdAt: Date;
}

const taskSchema: Schema<ITask> = new Schema({
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
      validator: function (value: Date) {
        return value >= new Date();
      },
      message: "Due date cannot be in the past",
    },
  },
  status: {
    type: String,
    enum: ["Done", "Planned", "Pending"],
    default: "Pending",
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add index for better query performance
taskSchema.index({ category_id: 1 });
taskSchema.index({ status: 1 });

const Task: Model<ITask> = mongoose.model<ITask>("Task", taskSchema);
export default Task;
export type { ITask };
