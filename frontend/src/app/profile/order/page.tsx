import { getProfile } from "@actions/AuthActions";
import { TProfile } from "@components/shop/Basket";
import Order from "@components/shop/Order";
import Link from "next/link";

const page = async () => {
  const profile: TProfile = await getProfile();
  return (
    <div className={`flex gap-4 `}>
      <div className="w-full">
        <p className="text-xl max-sm:pt-7 sm:text-2xl md:text-4xl ml-48 sm:ml-60 md:ml-96 z-[20] fixed">
          &gt; Orders
        </p>
        <div className={`mt-20 pb-12 w-full flex flex-col divide-y`}>
          {profile?.orders?.map((item, index) => (
            <Order
              order={item}
              key={index}
            />
          ))}
          {!profile?.orders && `No Order Exists`}
        </div>
      </div>
    </div>
  );
};

export default page;
