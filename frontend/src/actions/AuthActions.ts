"use server";
import { Basket, UserProfile } from "@models/Shop";
import { cookies } from "next/headers";
import { connectToDB } from "@lib/database";
export const getToken = async () => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken");
    return token?.value;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const authenticate = async () => {
  const token = await getToken();
  // console.log(token);
  const user = await fetch(`https://aryav.nl/api/getuser`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(`${err.message}`));
  // console.log(user);
  return { userId: user?._id, isAdmin: user?.isAdmin };
};

export const getProfile = async () => {
  const { userId } = await authenticate();
  if (!userId) {
    console.log("KOSSHER");
    return;
  }
  await connectToDB();
  let profile = [];
  profile = await UserProfile.find({ user: userId }).populate({
    path: "basket",
    populate: { path: "shoppingItem", populate: "product" },
  });
  if (!profile.length) {
    const basket = await Basket.create({});
    profile[0] = await UserProfile.create({
      user: userId,
      basket: basket,
    });
  }
  return profile[0];
};
