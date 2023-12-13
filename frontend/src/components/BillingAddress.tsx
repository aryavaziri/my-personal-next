import Link from "next/link";
import { type TAddress } from "@components/AddressCard";
import { AiTwotoneEdit } from "react-icons/ai";

const BillingAddress = async ({ address }: { address: TAddress }) => {
  return (
    <div className="grow p-8 shadow-md border rounded shadow-current border-current max-w-[400px]">
      <div className={`text-secondaryDark mb-4 flex justify-between`}>
        <p className={`text-2xl h-full align-middle`}>Billing Address</p>
        <Link
          href={`?showDialog=b`}
          className={`h-full text-lg hover:scale-[1.2]`}
        >
          <AiTwotoneEdit className={`align-middle inline-block h-full`} />
        </Link>
      </div>
      {address?.country ? (
        <>
          <p className={`text-2xl`}>{address?.country}</p>
          <p className={`text-xl font-light`}>
            {`${address?.state} - ${address?.city}`}
          </p>
          <p className={`text-xl font-light inline pr-1`}>
            {address?.address1}
          </p>
          <p className={`text-xl font-light inline px-1`}>
            {address?.address2}
          </p>
          <p className={`text-xl font-light inline px-1`}>
            {address?.houseNumber}
          </p>
          <p className={`text-xl font-light`}>
            {`Postal Code: ${address?.postalCode}`}
          </p>
          <p className={`text-xl py-4`}>{address?.phoneNumber}</p>
        </>
      ) : (
        <p className={`text-md font-light`}>No billing address</p>
      )}
    </div>
  );
};

export default BillingAddress;
