import AddItem from "@components/tdl/AddItem";
import DelList from "@components/tdl/DelList";
import DelItem from "@components/tdl/DelItem";
import ShareList from "@components/tdl/ShareList";
import CompleteItem from "@components/tdl/CompleteItem";
import Image from "next/image";

import { z } from "zod";

export const ProductSchema = z.object({
  _id: z.string(),
  name: z.string(),
  quantity_in_stock: z.number(),
  description: z.string(),
  image: z.any(),
  price: z.number(),
});

export type TProduct = z.infer<typeof ProductSchema>;

const Product = ({ product }: { product: TProduct }) => {
  return (
    <section className="shadow duration-100 rounded overflow-hidden bg-gradient-to-b from-sky-700/80 to-cyan-400/50 relative">
      <div className="w-full relative aspect-square">
        <Image
          className="object-cover"
          fill
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="p-3">
        <h1 className="text-2xl text-center">{product.name.toUpperCase()}</h1>
        <div className="flex justify-between gap-2">
          <p className={`flex-1 text-end font-bold`}>Description:</p>
          <p className={`flex-1 `}>{product.description}</p>
        </div>
        <div className="flex justify-between gap-2">
          <p className={`flex-1 text-end font-bold`}>Price:</p>
          <p className={`flex-1 `}>{product.price}</p>
        </div>
      </div>
    </section>
  );
};

export default Product;
