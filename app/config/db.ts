import mongoose, { ConnectOptions } from "mongoose";

// use mongoose to connect to MongoBD database
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL as string); // connection URL from env

    console.log(`MongoDN Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1); // Exit the process when connection failed
  }
};
