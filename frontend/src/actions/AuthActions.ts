"use server";
import { cookies } from "next/headers";
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
  //   console.log(token);
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
  return { userId: user._id, isAdmin: user.isAdmin };
};
