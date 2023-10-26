import mongoose from "mongoose";
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
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
    }
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
