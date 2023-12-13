import { type TAddress } from "@components/AddressCard";
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

export const Basket =
  mongoose.models.Basket ||
  mongoose.model(
    "Basket",
    new mongoose.Schema({
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      shoppingItem: [{ product: { type: Object }, quantity: { type: Number } }],
      totalPrice: { type: Number },
    })
  );

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
    {
      name: { type: String },
      type: { type: String },
      lastDigits: { type: Number },
      expiryMonth: { type: Number },
      expiryYear: { type: Number },
    },
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
