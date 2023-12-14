import mongoose from "mongoose";

export const Item =
  mongoose.models.Item ||
  mongoose.model(
    "Item",
    new mongoose.Schema({
      itemName: { type: String },
      done: { type: Boolean, default: false },
      quantity: { type: Number, default: 1 },
      source: { type: String },
      priority: { type: Number },
    })
  );

export const List =
  mongoose.models.List ||
  mongoose.model(
    "List",
    new mongoose.Schema({
      title: String,
      items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
      collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    })
  );
