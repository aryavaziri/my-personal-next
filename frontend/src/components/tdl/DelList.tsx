"use client";
import { type TItem, TList } from "@components/tdl/List";
import { RiDeleteBinLine } from "react-icons/ri";
import { delListAction } from "@actions/serverActions";

const DelList = ({ list }: { list: TList }) => {
  return (
    <button
      className={` hover:text-rose-500 text-2xl hover:scale-[1.1]`}
      onClick={async (e) => {
        e.preventDefault();
        await delListAction(list);
      }}
    >
      <RiDeleteBinLine />
    </button>
  );
};

export default DelList;
