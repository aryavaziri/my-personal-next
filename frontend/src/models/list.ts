import mongoose from "mongoose";
import { z } from "zod";

// export const ItemSchema = z.object({
//   name: z.string(),
//   done: z.boolean(),
//   quantity: z.number(),
//   source: z.string().optional(),
//   priority: z.number().optional(),
// });

// export type Item = z.infer<typeof ItemSchema>;

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

// export const ListSchema = z.object({
//   title: z.string(),
//   items: z.array(ItemSchema),
//   collaborators: z.array(z.object({})),
//   creator: z.object({}),
// });

// export type List = z.infer<typeof ListSchema>;

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
