import Link from "next/link";
import { type TAddress } from "@components/AddressCard";
import { AiTwotoneEdit } from "react-icons/ai";
import DelAddress from "./shop/DelAddress";
const ShippingAddress = async ({
  address,
  index,
}: {
  address: TAddress;
  index: number;
}) => {
  return (
    <>
      <div className="grow p-8 shadow-md border rounded hover:shadow-current border-current max-sm:w-full sm:max-w-[400px]">
        <div className={`text-secondaryDark mb-4 flex justify-between`}>
          <p className={`text-2xl align-middle h-full`}>
            {address.name}
            {address.isDefault && (
              <span className={`px-1 font-light text-sm`}>(Default)</span>
            )}
          </p>
          <div className={`flex gap-2`}>
            <Link
              className={`text-lg hover:scale-[1.2] `}
              href={`?showDialog=${index}`}
            >
              <AiTwotoneEdit className={`align-middle inline-block h-full`} />
            </Link>
            <DelAddress index={index} />
          </div>
        </div>
        <>
          <p className={`text-2xl`}>{address.country}</p>
          <p className={`text-2xl`}>{address.city}</p>
          <p className={`text-2xl`}>{address.address1}</p>
        </>
      </div>
    </>
  );
};

export default ShippingAddress;
