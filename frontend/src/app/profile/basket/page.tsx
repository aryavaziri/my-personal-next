import { getProfile, getToken } from "@actions/AuthActions";
import Link from "next/link";
import BillingAddress from "@components/BillingAddress";
import Basket, { type TBasket } from "@components/shop/Basket";

export const dynamic = "force-dynamic";

const page = async () => {
  const profile = await getProfile();
  const basket = profile?.basket;
  // const basket2 = await Basket.findById('fsa').shoppingItem.populate("product");
  // const sAddress: any[] = profile?.shippingAddress;
  // const bAddress = profile?.billingAddress;
  // console.log(profile.basket);
  // console.log(basket2);
  return (
    <div className={`flex gap-4 `}>
      <div className="w-full">
        <p className="text-xl max-sm:pt-7 sm:text-2xl md:text-4xl ml-48 sm:ml-60 md:ml-96 z-[20] fixed">
          {" "}
          &gt; Basket
        </p>
        <div className={`mt-20 pb-12 w-full`}>
          <Basket basket={basket} />
        </div>
      </div>
    </div>
  );
};

export default page;
