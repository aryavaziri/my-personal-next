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
import { type User } from "@app/Provider";

const ListDetails = ({ list }: { list: TList }) => {
  return <div> {`by ${list.creator.name ?? list.creator.email}`}</div>;
};

export default ListDetails;
