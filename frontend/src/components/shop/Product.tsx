import DeleteProduct from "./DeleteProduct";
import { z } from "zod";
import EditProduct from "./EditProduct";
import ProductImage from "./ProductImage";
import AddToCard from "./AddToCard";

export const ProductSchema = z.object({
  _id: z.string(),
  name: z.string(),
  quantity_in_stock: z.number(),
  description: z.string(),
  image: z.any(),
  price: z.number(),
});

export type TProduct = z.infer<typeof ProductSchema>;

const Product = async ({ product }: { product: TProduct }) => {
  return (
    <section className="group duration-100 shadow rounded overflow-hidden bg-gradient-to-b from-sky-700/80 to-cyan-400/50 relative">
      <div className="group-hover:flex hidden absolute top-2 right-2 z-[10] text-xl gap-1">
        <EditProduct product={product} />
        <DeleteProduct product={product} />
      </div>
      <ProductImage product={product} />

      <div className="px-3 mt-2 mb-4 flex flex-col gap-1">
        <h1 className="text-2xl text-center">{product.name.toUpperCase()}</h1>
        <div className="flex justify-between gap-2">
          {/* <p className={`flex-1 text-end font-bold`}>Description:</p> */}
          <p className={`flex-1 truncate max-h-12`}>{product.description}</p>
        </div>
        <div className="flex gap-2">
          {/* <p className={`font-bold`}>Price:</p> */}
          <p className={`flex-1 text-end text-lg`}>€ {product.price}</p>
        </div>
        <AddToCard product={product} />
      </div>
    </section>
  );
};

export default Product;
