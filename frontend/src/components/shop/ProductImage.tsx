import Image from "next/image";
import React from "react";
import { readFileSync } from "fs";
import { readdir } from "fs/promises";
import { TProduct } from "./Product";

const ProductImage = async ({ product }: { product: TProduct | null }) => {
  let imgDataUri;
  if (!product) {
    return;
  }
  try {
    // const dir = `shop/products/${product._id}`;
    const dir =
      process.env.NODE_ENV == "production"
        ? `/app/frontend/shop/products/${product._id}`
        : `shop/products/${product._id}`;
    const files = await readdir(dir);
    const img = readFileSync(`${dir}/${files.length - 1}.${product.image}`);
    imgDataUri = `data:image/${product.image};base64,${img.toString("base64")}`;
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="w-full relative aspect-square opacity-90 group-hover:opacity-100">
      <Image
        className="object-cover"
        fill
        src={imgDataUri || `/images/elementor-placeholder-image.webp`}
        alt={product.name}
      />
    </div>
  );
};

export default ProductImage;
