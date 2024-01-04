import React from "react";
import { getProfile } from "@actions/AuthActions";
import { type TProfile } from "./Basket";
import { type TAddress } from "@components/AddressCard";
import { type TBasket } from "./Basket";

export type TOrder = {
  userId: String;
  basket: TBasket;
  shippingAddress: TAddress;
  payment: { clientSecret: string; status: string };
};

const Order = async ({ order }: { order: TOrder }) => {
  console.log();
  return (
    <div className={`flex flex-col gap-2 p-4`}>
      <div className={`flex gap-2`}>
        <p>Payment Status: </p>
        <p>{order?.payment?.status}</p>{" "}
      </div>
      <div className={`flex gap-2`}>
        <p>Items:</p>
        <div>
          {order?.basket?.shoppingItem.map((item, index) => {
            console.log(item.product.name);
            return (
              <p
                key={index}
                className={``}
              >
                {item.product?.name}
              </p>
            );
          })}
        </div>
      </div>
      <div className={`flex gap-2`}>
        <p>Total Price:</p>
        <p>{order?.basket?.totalPrice}</p>
      </div>
    </div>
  );
};

export default Order;
