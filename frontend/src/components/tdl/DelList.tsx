"use client";
import { type TItem, TList } from "@components/tdl/List";
import { RiDeleteBinLine } from "react-icons/ri";

import { useRouter } from "next/navigation";

const DelList = ({ list }: { list: TList }) => {
  const router = useRouter();
  const delList = async () => {
    fetch(`http://localhost:5000/rh/list/${list?._id}`, {
      method: "DELETE",
    }).then(async (response) => {
      console.log(response);
      router.refresh();
    });
  };
  return (
    <button
      className={` hover:text-rose-500 text-2xl hover:scale-[1.1]`}
      onClick={async (e) => {
        e.preventDefault();
        await delList();
      }}
    >
      <RiDeleteBinLine />
    </button>
  );
};

export default DelList;
