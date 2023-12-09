"use client";
import { type TItem, TList } from "@components/tdl/List";
import { AiOutlineCheck } from "react-icons/ai";
import { completeItemAction } from "@actions/TDLserverActions";

const CompleteItem = ({ item, list }: { item: TItem; list: TList }) => {
  return (
    <button
      className="hover:scale-[1.2] duration-300 hover:text-secondaryLight"
      onClick={(e) => {
        e.preventDefault();
        completeItemAction(item, list);
      }}
    >
      <AiOutlineCheck />
    </button>
  );
};

export default CompleteItem;
