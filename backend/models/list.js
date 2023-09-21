import mongoose from "mongoose";
const Schema = mongoose.Schema;

const listSchema = new Schema(
  {
    title: { type: String, required: true },
    items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
    collaborators: [{ type: Schema.Types.ObjectId, ref: "User" }],
    author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

const itemSchema = new Schema(
  {
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
    quantity: { type: Number, default: 1 },
    source: { type: String },
    priority: { type: String },
  },
  { timestamps: true }
);

export const List = mongoose.model("List", listSchema);
export const Item = mongoose.model("Item", itemSchema);
