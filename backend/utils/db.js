import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Db connected successfully");
  } catch (error) {
    console.log("Db connection failed", error);
  }
};

export default connectDB;
