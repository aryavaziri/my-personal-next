import { z } from "zod";
import { ProductSchema } from "./Product";
import ProductImage from "./ProductImage";
import { ItemDecrement, ItemIncrement, ItemRemove } from "./BasketUI";
import { TAddress } from "@components/AddressCard";
import Checkout from "./Checkout";
import Payment from "./Payment";
import { getProfile, getToken } from "@actions/AuthActions";

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

export type TProfile = {
  basket: TBasket;
  billingAddress: TAddress;
  shippingAddress: TAddress[];
  payments: Object[];
};

export type TBasket = z.infer<typeof BasketSchema>;

const Basket = async () => {
  const profile: TProfile = await getProfile();
  // console.log(profile);
  let temp = profile.shippingAddress.findIndex(
    (add: TAddress) => add.isDefault
  );
  let ind = temp === -1 ? "b" : temp;
  // console.log(temp);
  return (
    <div className={`flex group`}>
      <div className="grow p-8 pb-4 shadow-md border rounded hover:shadow-light/30 border-current max-sm:w-full sm:max-w-[600px] mx-auto">
        {profile?.basket?.shoppingItem?.length ? (
          <>
            <div>
              <ul className="divide-y divide-light/40 gap-2 flex flex-col">
                {profile?.basket?.shoppingItem.map((item, index) => (
                  <li
                    className={`group flex p-1`}
                    key={index}
                  >
                    <div className={`h-32 w-32 overflow-hidden rounded`}>
                      <ProductImage product={item.product} />
                    </div>

                    <div className={`grow flex px-2 flex-col h-32 pb-1`}>
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
              <div className={`flex my-4 justify-between`}>
                <p className={`text-2xl grow text-end pr-4`}>{`Total Price (${
                  profile?.basket?.totalItem
                } item${profile?.basket?.totalItem > 1 ? "s" : ""}): `}</p>
                <p className={`text-2xl pr-5`}>
                  {profile?.basket?.totalPrice} €
                </p>
              </div>
            </div>
            <div className="px-8 py-4 my-6 shadow-md border rounded hover:shadow-light/30 border-current max-sm:w-full sm:max-w-[600px] mx-auto">
              <h1
                className={`pb-1 text-secondaryDark light:text-secondaryLight`}
              >
                SHIPPING ADDRESS
              </h1>
              <div className={`flex justify-between w-full`}>
                <select
                  id="address"
                  className="w-full overflow-hidden "
                  defaultValue={ind}
                >
                  <option
                    value="b"
                    aria-selected={temp === -1}
                    className={`font-light aria-selected:font-medium`}
                  >
                    {`${`
                  Ship To Billing Address : 
                  ${profile?.billingAddress?.city} - 
                  ${profile?.billingAddress?.address1}`.substring(0, 110)}`}
                  </option>
                  {profile?.shippingAddress.map((element, index) => (
                    <option
                      value={index}
                      aria-selected={element.isDefault}
                      key={index}
                      className={`font-light aria-selected:font-medium`}
                    >
                      {`${`
                  ${element?.name} - 
                  ${element?.city} - 
                  ${element?.address1}`.substring(0, 110)}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Checkout />
          </>
        ) : (
          <p className={`text-md font-light`}>Card is empty</p>
        )}
      </div>
      <Payment />
      {/* <Payment profile={profile?.basket?.totalPrice} /> */}
    </div>
  );
};

export default Basket;

// 1- Internationallity
// 2- Dutch Learning
// 3- Labour Culture
