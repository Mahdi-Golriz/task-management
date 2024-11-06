import mongoose, { ConnectOptions } from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL as string);

    // console.log("process.env.MONGO_URL", process.env.MONGO_URL);
    console.log(`MongoDN Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
