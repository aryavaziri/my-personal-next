"use client";
import { type TItem, TList } from "@components/tdl/List";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiShare2 } from "react-icons/fi";

import { useRouter } from "next/navigation";

const ShareList = ({ list }: { list: TList }) => {
  const router = useRouter();
  const shareList = async () => {
    fetch(`${process.env.hostname}/rh/list/${list?._id}/share`, {
      method: "GET",
    }).then(async (response) => {
      console.log(response);
      router.refresh();
    });
  };
  return (
    <button
      className={` hover:text-amber-400 text-xl hover:scale-[1.1]`}
      // onClick={async (e) => {
      //   e.preventDefault();
      //   await shareList();
      // }}
    >
      <FiShare2 />
    </button>
  );
};

export default ShareList;
