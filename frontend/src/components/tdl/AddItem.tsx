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
export const schema = z.object({
  itemName: z.string().max(20),
});
import { useRouter } from "next/navigation";

// export type List = z.infer<typeof ListSchema>;

const AddItem = ({ list }: { list: TList }) => {
  const router = useRouter();
  const myContext = useContext(Context);
  const { register, control, handleSubmit, watch, formState, reset } =
    useForm<TItem>({
      defaultValues: {
        itemName: "",
      },
      resolver: zodResolver(schema),
    });
  const addItem = async (payload: TItem) => {
    console.log(payload);
    console.log(list?._id);
    fetch(`http://localhost:5000/rh/list/${list?._id}`, {
      method: "POST",
      body: JSON.stringify({
        itemName: payload.itemName,
      }),
    }).then(async (response) => {
      console.log(response);
      reset();
      router.refresh();
    });
  };
  return (
    <form
      onSubmit={handleSubmit(addItem)}
      className="flex gap-2 relative"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <input
        className="px-2 rounded w-32 bg-dark/40 flex-1 py-1"
        placeholder="New Item"
        {...register("itemName")}
      />
      {/* <input
        className="px-2 rounded w-32"
        placeholder="New Item"
        {...register("done")}
        type="checkbox"
      /> */}
      <button
        type="submit"
        onClick={handleSubmit(addItem)}
        className="absolute right-2 inset-y-1 bg-secondaryLight/50 rounded-full p-1 text-md duration-200 hover:bg-secondaryLight text-dark"
      >
        <AiOutlinePlus className="" />
      </button>
      {/* <button
        type="submit"
        className="bg-slate-200 rounded-full p-1 duration-300 hover:bg-teal-200"
      >
        <AiOutlineBars />
      </button> */}
    </form>
  );
};

export default AddItem;
