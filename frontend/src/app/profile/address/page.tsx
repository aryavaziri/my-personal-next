import { getProfile, getToken } from "@actions/AuthActions";
import Link from "next/link";
import BillingAddress from "@components/BillingAddress";
import ShippingAddress from "@components/ShippingAddress";
import Modal from "@components/modals/Modal";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { TAddress } from "@components/AddressCard";

export const dynamic = "force-dynamic";

const page = async () => {
  const profile = await getProfile();
  const sAddress: any[] = profile?.shippingAddress;
  const bAddress = profile?.billingAddress;
  const isDefault =
    profile.shippingAddress.findIndex((add: TAddress) => add.isDefault) === -1;
  return (
    <div className={`flex gap-4 `}>
      <Modal />
      <div className="w-full">
        <p className="text-xl max-sm:pt-7 sm:text-2xl md:text-4xl ml-48 sm:ml-60 md:ml-96 z-[20] fixed">
          {" "}
          &gt; Your Addresses
        </p>
        <div
          className={`mt-20 pb-12 max-sm:justify-items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full`}
        >
          <BillingAddress
            isDefault={isDefault}
            address={bAddress}
          />

          {bAddress?.country &&
            sAddress.length > 0 &&
            sAddress.map((address, index) => (
              <ShippingAddress
                key={address._id.toString()}
                address={address}
                index={index}
              />
            ))}
          <Link
            className={`h-full text-lg hover:scale-[1.2]`}
            href={`?showDialog=n`}
          >
            {bAddress?.country && (
              <MdOutlineLibraryAdd className={`h-full w-full p-32`} />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
