import mongoose from "mongoose";

let isConnected = false;

import User from "@models/user";
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Mongoose is already connected");
    return;
  }
  mongoose
    .connect(process.env.DB_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      isConnected = true;
      console.log("Mongoose connected");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
};
