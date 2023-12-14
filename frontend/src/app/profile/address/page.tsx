import { getProfile, getToken } from "@actions/AuthActions";
import Link from "next/link";
import BillingAddress from "@components/BillingAddress";
import ShippingAddress from "@components/ShippingAddress";
import Modal from "@components/modals/Modal";
import { MdOutlineLibraryAdd } from "react-icons/md";

export const dynamic = "force-dynamic";

const page = async () => {
  const profile = await getProfile();
  const sAddress: any[] = profile?.shippingAddress;
  const bAddress = profile?.billingAddress;
  return (
    <>
      <Modal />
      <div className="w-full">
        <p className="text-4xl ml-96 z-[20] fixed"> &gt; Your Addresses</p>
        <div className={`mt-20 pb-12 grid grid-cols-3 gap-4 w-full`}>
          <BillingAddress address={bAddress} />

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
            <MdOutlineLibraryAdd className={`h-full w-full p-20`} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default page;
