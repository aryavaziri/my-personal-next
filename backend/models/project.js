import mongoose from "mongoose";
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    preset: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      require: true,
    },
    video: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
      require: true,
    },
    tech: {
      type: [String],
    },
    extention: {
      type: String,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
