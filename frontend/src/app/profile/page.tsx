import Link from "next/link";
import { FaRegAddressCard } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { GrUnorderedList } from "react-icons/gr";

const page = () => {
  return (
    <>
      <div className={`flex mt-20 gap-4 max-sm:flex-col justify-between`}>
        <Link
          href={`/profile/address`}
          className={`border rounded p-2 border-current grow text-2xl flex justify-evenly btn1 max-w-[300px] max-sm:mx-auto max-sm:w-full`}
        >
          <FaRegAddressCard className={` text-4xl`} />

          <p className="">Your Addresses</p>
        </Link>
        <Link
          href={`/profile/payment`}
          className={`border rounded p-2 border-current grow text-2xl flex justify-evenly btn1 max-w-[300px] max-sm:mx-auto max-sm:w-full`}
        >
          <MdPayment className={` text-4xl`} />
          <p className="text-2xl">Your Payments</p>
        </Link>
        <Link
          href={`/profile/order`}
          className={`border rounded p-2 border-current grow text-2xl flex justify-evenly btn1 max-w-[300px] max-sm:mx-auto max-sm:w-full`}
        >
          <GrUnorderedList className={` text-4xl`} />
          <p className="text-2xl">Your Orders</p>
        </Link>
      </div>
    </>
  );
};

export default page;
