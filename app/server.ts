import express from "express";
import { connectDB } from "./config/db.js";
import "dotenv/config";
import tasks from "./routes/taskRoutes.js";
import categoryAPI from "./routes/categoryRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

const port = process.env.PORT || 5555;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/tasks", tasks);
app.use("/api/categories", categoryAPI);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
