"use server";
import { authenticate, getProfile } from "./AuthActions";
import { Product, UserProfile } from "@models/Shop";
import { type TProduct } from "@components/shop/Product";
import { revalidateTag, revalidatePath } from "next/cache";
import { HydratedDocument } from "mongoose";
import { writeFileSync, readdir } from "fs";
import { mkdir } from "fs/promises";
import { connectToDB } from "@lib/database";
import { TAddress } from "@components/AddressCard";

export const addProductAction = async (payload: FormData) => {
  try {
    const { userId, isAdmin } = await authenticate();
    const file = payload.get("imageFile") as File;
    if (!file || !isAdmin) return;
    await connectToDB();
    const extention = file.type.split(`/`)[1];
    const product: HydratedDocument<TProduct> = await Product.create({
      name: payload.get("name"),
      description: payload.get("description"),
      price: parseInt(payload.get("price") as string),
      quantity_in_stock: parseInt(payload.get("quantity") as string),
      image: extention,
    });
    // const dir = await mkdir(`shop/products/${product._id}`, {
    const dir = await mkdir(`/app/frontend/shop/products/${product._id}`, {
      recursive: true,
    });
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    let count = 0;
    readdir(dir as string, (err, files) => {
      count = files.length;
    });
    writeFileSync(`${dir}/${count}.${extention}`, buffer);

    revalidateTag("shop");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const delProductAction = async (payload: TProduct) => {
  const { userId, isAdmin } = await authenticate();
  if (!isAdmin) return;
  try {
    await Product.findByIdAndDelete(payload._id);
    revalidateTag("shop");
  } catch (error) {
    console.log(error);
  }
};

export const changeProductImageAction = async (payload: FormData) => {
  const { userId, isAdmin } = await authenticate();
  if (!isAdmin) return;
  const file = payload.get("imageFile") as File;
  const productId = payload.get("productId") as string;
  try {
    const extention = file.type.split(`/`)[1];
    const dir = `shop/products/${productId}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    let count;
    readdir(dir as string, (err, files) => {
      count = files.length;
      writeFileSync(`${dir}/${count}.${extention}`, buffer);
    });
    await connectToDB();
    const product = (await Product.findById(
      productId
    )) as HydratedDocument<TProduct>;
    product.image = extention;
    await product.save();
    revalidateTag("shop");
  } catch (error) {
    console.log(error);
  }
};

export const editOrAddBillingAddress = async (payload: TAddress) => {
  try {
    await connectToDB();
    const profile = await getProfile();
    await profile.editOrAddBillingAddress(payload);
    revalidateTag("address");
  } catch (error) {
    console.log(error);
  }
};
export const addShippingAddress = async (payload: TAddress) => {
  try {
    await connectToDB();
    const profile = await getProfile();
    await profile.addShippingAddress(payload);
    revalidateTag("address");
  } catch (error) {
    console.log(error);
  }
};

export const delShippingAddress = async (index: number) => {
  try {
    await connectToDB();
    const profile = await getProfile();
    await profile.delShippingAddress(index);
    revalidateTag("address");
  } catch (error) {
    console.log(error);
  }
};

export const editShippingAddress = async (payload: TAddress, index: number) => {
  try {
    // const searchParams = useSearchParams();
    // const index = parseInt(searchParams.get("showDialog") ?? "-1");
    await connectToDB();
    const profile = await getProfile();
    await profile.editShippingAddress(payload, index);
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/profile/address");
};
