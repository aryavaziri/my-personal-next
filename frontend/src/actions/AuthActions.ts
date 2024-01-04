"use server";
import { Basket, UserProfile } from "@models/Shop";
import { cookies } from "next/headers";
import { connectToDB } from "@lib/database";
import { TProfile } from "@components/shop/Basket";
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
      if(res.ok){
        return res.json();
      }
      // return res.text()
      return null;
    })
    .catch((err) => console.log(`${err.message}`));
  // console.log(user);
  return { userId: user?._id, isAdmin: user?.isAdmin };
};

export const getProfile = async () => {
  const { userId } = await authenticate();
  if (!userId) {
    console.log("No valid token");
    return {};
  }
  await connectToDB();

  let profile = await UserProfile.findOne({ user: userId })
    .populate({
      path: "basket",
      populate: { path: "shoppingItem", populate: "product" },
    })
    .populate("orders");
  if (!profile || !profile.basket) {
    const basket = await Basket.create({});
    profile = await UserProfile.create({
      user: userId,
      basket: basket,
    });
    console.log("USER PROFILE CREATED");
  }
  return profile;
};
