"use client";
import { delShippingAddress } from "@actions/shopServerActions";
import { RiDeleteBin3Line } from "react-icons/ri";

const DelAddress = ({ index }: { index: number }) => {
  return (
    <button
      className={`text-red-500 text-lg hover:scale-[1.2]`}
      onClick={async () => await delShippingAddress(index)}
    >
      <RiDeleteBin3Line className={`align-middle inline-block h-full`} />
    </button>
  );
};

export default DelAddress;
