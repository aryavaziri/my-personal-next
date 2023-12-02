"use server";
import { cookies } from "next/headers";

export const getToken = async () => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken");
    return token?.value;
  } catch (error) {
    console.log(error);
  }
};
