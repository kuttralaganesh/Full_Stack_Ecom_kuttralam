import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((data) => {
      console.log("MongoDB connected successfully", data.connection.host);
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB", err.message);
    });
};

export default connectDB;
