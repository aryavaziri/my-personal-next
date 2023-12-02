"use client";
import { useContext, useEffect, useState } from "react";
import { Context } from "@app/Provider";
import { useForm } from "react-hook-form";
import { type TItem, TList } from "@components/tdl/List";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AiOutlineDelete,
  AiOutlineCheck,
  AiOutlinePlus,
  AiOutlineBars,
} from "react-icons/ai";
import { z } from "zod";
import { useRouter } from "next/navigation";

// export type List = z.infer<typeof ListSchema>;
const DelItem = ({ item, list }: { item: TItem; list: TList }) => {
  const router = useRouter();
  // const myContext = useContext(Context);
  const delItem = async () => {
    await fetch(`http://localhost:5000/rh/list/${list?._id}/${item?._id}`, {
      method: "DELETE",
    }).then((response) => {
      console.log(response);
      router.refresh();
    });
  };
  return (
    <button
      className="hover:scale-[1.2] duration-300 hover:text-rose-500"
      onClick={(e) => {
        e.preventDefault();
        delItem();
      }}
    >
      <AiOutlineDelete />
    </button>
  );
};

export default DelItem;
