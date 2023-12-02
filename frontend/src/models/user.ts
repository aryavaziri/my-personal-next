import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      require: true,
    },
    hpassword: {
      type: String,
    },
    profileImg: {
      type: String,
      default: "/images/default_user.jpg",
    },
    language: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isGoogleAccount: {
      type: Boolean,
      default: false,
    },
    isSignByMail: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { updatedAt: "lastLogin" } }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
