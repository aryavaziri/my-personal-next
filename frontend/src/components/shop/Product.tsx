import DeleteProduct from "./DeleteProduct";
import { z } from "zod";
import EditProduct from "./EditProduct";
import ProductImage from "./ProductImage";

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

      <div className="p-3 mb-4 flex flex-col gap-2 text-lg">
        <h1 className="text-2xl my-2 text-center">
          {product.name.toUpperCase()}
        </h1>
        <div className="flex justify-between gap-2">
          {/* <p className={`flex-1 text-end font-bold`}>Description:</p> */}
          <p className={`flex-1`}>{product.description}</p>
        </div>
        <div className="flex gap-2">
          <p className={`font-bold`}>Price:</p>
          <p className={`flex-1`}>{product.price} €</p>
        </div>
        <button
          className="border rounded border-current enabled:hover:bg-light enabled:hover:text-dark disabled:opacity-75 "
          disabled={product.quantity_in_stock == 0}
        >
          ADD TO CARD
        </button>
      </div>
    </section>
  );
};

export default Product;
