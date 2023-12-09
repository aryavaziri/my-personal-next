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
import { delItemAction } from "@actions/TDLserverActions";

const DelItem = ({ item, list }: { item: TItem; list: TList }) => {
  return (
    <button
      className="hover:scale-[1.2] duration-300 hover:text-rose-500"
      onClick={(e) => {
        e.preventDefault();
        delItemAction(item._id, list._id);
      }}
    >
      <AiOutlineDelete />
    </button>
  );
};

export default DelItem;
