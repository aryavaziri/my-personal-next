"use server";
import { authenticate, getProfile } from "./AuthActions";
import { Basket, Product, UserProfile } from "@models/Shop";
import { connectToDB } from "@lib/database";
import { type TBasket } from "@components/shop/Basket";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const CreatePaymentIntent = async () => {
  try {
    const profile = await getProfile();
    const basket: TBasket | null = await Basket.findById(profile?.basket);
    const paymentIntent =
      basket &&
      (await stripe.paymentIntents.create({
        amount: basket?.totalPrice * 100,
        currency: "eur",
        payment_method_types: ["card", "ideal"],
        // automatic_payment_methods: { enabled: true },
      }));
    profile.payments.push(paymentIntent);
    // console.log(profile);
    profile.save();
    return { clientSecret: paymentIntent?.client_secret };
  } catch (error: any) {
    console.log(error?.message);
    return { error: error?.message };
  }
};

// export const GetPaymentIntent = async () => {
//   try {
//     const profile = await getProfile();
//     console.log(profile);
//     const basket: TBasket | null = await Basket.findById(profile?.basket);
//     const paymentIntent =
//       basket &&
//       (await stripe.paymentIntents.create({
//         amount: basket?.totalPrice * 100,
//         currency: "eur",
//         // payment_method:['card', 'ideal'],
//         automatic_payment_methods: { enabled: true },
//       }));
//     profile.payments;
//     profile.payments.push({
//       _id: paymentIntent?.client_secret,
//       payment: paymentIntent,
//     });
//     console.log(profile);
//     profile.save();
//     return { clientSecret: paymentIntent?.client_secret };
//   } catch (error: any) {
//     console.log(error);
//     return { error: error?.message };
//   }
// };
