import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    profileImg: {
      type: String,
      default: "/IMG/default",
    },
    language: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
    },
  },
  { timestamps: { updatedAt: "lastLogin" } }
);

export const User = mongoose.model("User", userSchema);
