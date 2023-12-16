import { z } from "zod";
import { ProductSchema } from "./Product";
import ProductImage from "./ProductImage";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { ItemDecrement, ItemIncrement, ItemRemove } from "./BasketUI";

export const BasketSchema = z.object({
  user: z.string(),
  shoppingItem: z.array(
    z.object({
      product: ProductSchema,
      quantity: z.number(),
    })
  ),
  totalPrice: z.number(),
  totalItem: z.number(),
});

export type TBasket = z.infer<typeof BasketSchema>;

const Basket = ({ basket }: { basket: TBasket }) => {
  // console.log(basket);
  return (
    <div className="grow p-8 shadow-md border rounded hover:shadow-light/30 border-current max-sm:w-full sm:max-w-[600px] mx-auto">
      {basket?.shoppingItem?.length ? (
        <>
          <div>
            <ul className="divide-y divide-light/40 gap-2 flex flex-col">
              {basket?.shoppingItem.map((item, index) => (
                <li
                  className={`group flex p-1`}
                  key={index}
                >
                  <div className={`h-32 w-32 overflow-hidden`}>
                    <ProductImage product={item.product} />
                  </div>

                  <div className={`grow flex px-2 flex-col h-32`}>
                    <p className={`text-2xl`}>{`${item.product.name}`}</p>
                    <p
                      className={`text-lg grow`}
                    >{`${item.product.description}`}</p>
                    <div className={`h-6 flex justify-between`}>
                      <div className={`text-xl flex`}>
                        <div className={`flex grow h-full`}>
                          <div className={`mr-2 leading-6`}>Quantity:</div>
                          <ItemDecrement
                            productId={item.product._id.toString()}
                          />
                          <div className={`px-2 leading-6`}>
                            {item.quantity}
                          </div>
                          <ItemIncrement
                            productId={item.product._id.toString()}
                          />
                        </div>
                        <ItemRemove productId={item.product._id.toString()} />
                      </div>
                      <p className={`text-xl`}>{item.product.price} €</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <hr className="my-2 border-light/60" />
            <div className={`flex justify-between`}>
              <p className={`text-2xl grow text-end pr-4`}>{`Total Price (${
                basket?.totalItem
              } item${basket?.totalItem > 1 ? "s" : ""}): `}</p>
              <p className={`text-2xl pr-5`}>{basket?.totalPrice} €</p>
            </div>
          </div>
          <div className="grow p-8 shadow-md border rounded hover:shadow-light/30 border-current max-sm:w-full sm:max-w-[600px] mx-auto">
            SHIPPING ADDRESS: {}
          </div>
        </>
      ) : (
        <p className={`text-md font-light`}>Card is empty</p>
      )}
    </div>
  );
};

export default Basket;

// 1- Internationallity
// 2- Dutch Learning
// 3- Labour Culture
