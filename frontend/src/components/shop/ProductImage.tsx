import Image from "next/image";
import React from "react";
import { readFileSync } from "fs";
import { readdir } from "fs/promises";
import { TProduct } from "./Product";

const ProductImage = async ({ product }: { product: TProduct }) => {
  let imgDataUri;
  try {
    // const dir = `shop/products/${product._id}`;
    const dir = `/app/frontend/shop/products/${product._id}`;
    const files = await readdir(dir);
    const img = readFileSync(`${dir}/${files.length - 1}.${product.image}`);
    imgDataUri = `data:image/${product.image};base64,${img.toString("base64")}`;
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="w-full relative aspect-square group-hover:opacity-70">
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
