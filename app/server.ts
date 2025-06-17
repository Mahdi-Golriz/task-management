import express from "express";
import { connectDB } from "./config/db.js";
import "dotenv/config";
import tasks from "./routes/taskRoutes.js";
import categoryAPI from "./routes/categoryRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import cors from "cors";

// set the port from env or 5555 as default
const port = process.env.PORT || 5555;

connectDB(); // connect the web server to database

const app = express(); // create a web server

// Configure cross-origin requests to allow requests from the origin (host of frontend app) with specific methods and headers
app.use(
  cors({
    origin: "http://localhost:8787",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: false }));

app.use("/api/tasks", tasks);
app.use("/api/categories", categoryAPI);

// Custom error-handling middleware to manage errors across the app
app.use(errorHandler);

// Starting the server and logging the port it's running on
app.listen(port, () => console.log(`Server started on port ${port}`));
