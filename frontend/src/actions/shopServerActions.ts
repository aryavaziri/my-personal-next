"use server";
import { cookies } from "next/headers";
import { Product } from "@models/Shop";
import { type TProduct } from "@components/shop/Product";
import { type TProductInput } from "@components/shop/AddProduct";
import { revalidateTag } from "next/cache";
import { HydratedDocument } from "mongoose";
import { z } from "zod";
import { writeFileSync } from "fs";
// const schema = z.object({
//   name: z.string().min(1, "Name is required").max(12),
//   description: z.string(),
//   image: z.custom<File>(),
//   quantity_in_stock: z.coerce.number(),
//   price: z.coerce.number(),
// });
// export type TProductInput2 = z.infer<typeof schema>;

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
  console.log(token);
  const fetchData = await fetch(`https://aryav.nl/api/getuser`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(`${err.message}`));
  console.log(fetchData);
  return { userId: fetchData._id };
};

export const addProductAction = async (payload: FormData) => {
  const { userId } = await authenticate();
  const file = payload.get("image") as File;
  if (!file) return;
  console.log(file);

  userId && writeFileSync("tmp.txt", "file");
  // (await Product.create({
  //   name: payload.get('name'),
  //   description: payload.get('description'),
  //   price: payload.get('price'),
  //   quantity_in_stock: payload.get('quantity'),
  //   image: payload.get('name'),
  // }));
  // revalidateTag("shop");
};
