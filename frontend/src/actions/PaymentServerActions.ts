"use server";
import { authenticate, getProfile } from "./AuthActions";
import { Basket, Order, Product, UserProfile } from "@models/Shop";
import { connectToDB } from "@lib/database";
import { TProfile, type TBasket } from "@components/shop/Basket";
import { Stripe } from "stripe";
import { HydratedDocument } from "mongoose";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const CreatePaymentIntent = async () => {
  try {
    const { userId } = await authenticate();
    const profile: HydratedDocument<TProfile> = await getProfile();
    const basket: HydratedDocument<TBasket> | null = await Basket.findById(
      profile?.basket
    )
      .populate({
        path: "shoppingItem",
        populate: "product",
      })
      .exec();
    if (!basket) {
      return;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: basket?.totalPrice * 100,
      currency: "eur",
      payment_method_types: ["card", "ideal"],
      // automatic_payment_methods: { enabled: true },
    });
    basket.inProgress = true;
    console.log(basket.shoppingItem[0].product);
    const order = await Order.create({
      user: userId,
      payment: paymentIntent,
      shipping: { city: "TEST" },
      basket: basket,
    });
    profile.orders.push(order);
    basket.inProgress = false;
    basket.shoppingItem = [];
    basket.save();
    profile.save();
    return { clientSecret: paymentIntent?.client_secret };
  } catch (error: any) {
    console.log(error?.message);
    return { error: error?.message };
  }
};

export const IntentStatus = async ({
  client_secret,
}: {
  client_secret: string;
}) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(client_secret);
    return { paymentIntent };
  } catch (error: any) {
    console.log(error);
    return { error: error?.message };
  }
};
