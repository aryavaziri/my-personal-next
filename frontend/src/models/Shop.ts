import mongoose from "mongoose";

export const Product =
  mongoose.models.Product ||
  mongoose.model(
    "Product",
    new mongoose.Schema({
      name: { type: String },
      description: { type: String },
      quantity_in_stock: { type: Number },
      image: { type: String },
      price: { type: Number },
    })
  );

export const ShoppingCard =
  mongoose.models.ShoppingCard ||
  mongoose.model(
    "ShoppingCard",
    new mongoose.Schema({
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      shoppingItem: [
        { type: mongoose.Schema.Types.ObjectId, ref: "ShoppingItem" },
      ],
      totalPrice: { type: Number },
    })
  );

export const ShoppingItem =
  mongoose.models.ShoppingItem ||
  mongoose.model(
    "ShoppingItem",
    new mongoose.Schema({
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    })
  );
