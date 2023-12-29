import { type TAddress } from "@components/AddressCard";
import { type TBasket } from "@components/shop/Basket";
import { type TProduct } from "@components/shop/Product";
import mongoose from "mongoose";
import { HydratedDocument } from "mongoose";
import { Item } from "./List";

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

const BasketSchema = new mongoose.Schema({
  shoppingItem: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, default: 0 },
  totalItem: { type: Number, default: 0 },
});

BasketSchema.method(
  "addToCard",
  function (payload: HydratedDocument<TProduct>) {
    const index = this.shoppingItem.findIndex(
      (item) => item.product?.toString() == payload._id
    );
    if (index == -1) {
      this.shoppingItem.push({ product: payload, quantity: 1 });
    } else {
      this.shoppingItem[index].quantity += 1;
    }
    return this.save();
  }
);

BasketSchema.method("removeFromCard", function (productId: string) {
  const index = this.shoppingItem.findIndex(
    (item) => item.product?.toString() == productId
  );
  if (index !== -1) {
    this.shoppingItem.splice(index, 1);
  }
  return this.save();
});

BasketSchema.method("decrementFromCard", function (productId: string) {
  const index = this.shoppingItem.findIndex(
    (item) => item.product?.toString() == productId
  );
  if (index !== -1) {
    if (this.shoppingItem[index].quantity > 1) {
      this.shoppingItem[index].quantity -= 1;
    } else {
      this.shoppingItem.splice(index, 1);
    }
  }
  return this.save();
});
BasketSchema.method("incrementFromCard", async function (productId: string) {
  const index = this.shoppingItem.findIndex(
    (item) => item.product?.toString() == productId
  );
  if (index !== -1) {
    console.log("1");
    const { quantity_in_stock }: { quantity_in_stock: number } =
      await Product.findById(productId).select("quantity_in_stock").exec();
    console.log(quantity_in_stock);

    if (this.shoppingItem[index].quantity < quantity_in_stock) {
      this.shoppingItem[index].quantity += 1;
    }
  }
  return this.save();
});

BasketSchema.pre("save", async function (next) {
  let totalPrice = 0;
  let totalItem = 0;
  if (this.shoppingItem.length !== 0) {
    for (const item of this.shoppingItem) {
      const populatedItem: { price: number } = await Product.findById(
        item.product
      )
        .select("price")
        .exec();
      if (populatedItem) {
        totalPrice += populatedItem.price * item.quantity;
        totalItem += item.quantity;
      }
    }
  }
  this.totalItem = totalItem;
  this.totalPrice = totalPrice;
  next();
});

export const Basket =
  mongoose.models.Basket || mongoose.model("Basket", BasketSchema);

export const Order =
  mongoose.models.Order ||
  mongoose.model(
    "Order",
    new mongoose.Schema({
      products: [
        {
          product: { type: Object },
          quantity: { type: Number },
        },
      ],
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      paymentConfirmed: { type: Boolean },
      shipping: { type: Object }, // Snapshot of which address is shipping to
      status: { type: String },
    })
  );

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  billingAddress: {
    country: { type: String },
    state: { type: String },
    city: { type: String },
    address1: { type: String },
    address2: { type: String },
    houseNumber: { type: String },
    postalCode: { type: String },
    phoneNumber: { type: String },
  },
  shippingAddress: [
    {
      name: { type: String },
      country: { type: String },
      state: { type: String },
      city: { type: String },
      address1: { type: String },
      address2: { type: String },
      houseNumber: { type: String },
      postalCode: { type: String },
      phoneNumber: { type: String },
      isDefault: { type: Boolean, default: false },
    },
  ],
  payments: [
    { type: Object },
    // {
    //   payment:
    // },
  ],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  basket: { type: mongoose.Schema.Types.ObjectId, ref: "Basket" },
});

userProfileSchema.method(
  "editOrAddBillingAddress",
  function (payload: TAddress) {
    // const billingAddress = {
    //   country: payload.country,
    //   state: payload.state,
    //   city: payload.city,
    //   address1: payload.address1,
    //   address2: payload.address2,
    //   houseNumber: payload.houseNumber,
    //   postalCode: payload.postalCode,
    //   phoneNumber: payload.phoneNumber,
    // };
    // this.billingAddress = billingAddress;
    this.billingAddress = payload;
    return this.save();
  }
);

userProfileSchema.method("addShippingAddress", function (payload: TAddress) {
  this.shippingAddress.push(payload);
  return this.save();
});

userProfileSchema.method("delShippingAddress", function (index: number) {
  this.shippingAddress.splice(index, 1);
  return this.save();
});

userProfileSchema.method(
  "editShippingAddress",
  function (payload: TAddress, index: number) {
    const address = this.shippingAddress[index];
    if (address) {
      address.name = payload.name;
      address.country = payload.country;
      address.state = payload.state;
      address.city = payload.city;
      address.address1 = payload.address1;
      address.address2 = payload.address2;
      address.houseNumber = payload.houseNumber;
      address.phoneNumber = payload.phoneNumber;
      address.postalCode = payload.postalCode;
    }
    return this.save();
  }
);

export const UserProfile =
  mongoose.models.UserProfile ||
  mongoose.model("UserProfile", userProfileSchema);
