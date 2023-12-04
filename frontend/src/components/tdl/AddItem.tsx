"use client";
import { useForm } from "react-hook-form";
import { type TItem, TList } from "@components/tdl/List";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlinePlus } from "react-icons/ai";
import { z } from "zod";
export const schema = z.object({
  itemName: z.string().max(20),
});
import { addItemAction } from "@actions/serverActions";

const AddItem = ({ list }: { list: TList }) => {
  const { register, handleSubmit, reset } = useForm<TItem>({
    defaultValues: {
      itemName: "",
    },
    resolver: zodResolver(schema),
  });
  const addItem = async (payload: TItem) => {
    await addItemAction(payload, list?._id).then(() => {
      reset();
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
      <button
        type="submit"
        onClick={handleSubmit(addItem)}
        className="absolute right-2 inset-y-1 bg-secondaryLight/50 rounded-full p-1 text-md duration-200 hover:bg-secondaryLight text-dark"
      >
        <AiOutlinePlus className="" />
      </button>
    </form>
  );
};

export default AddItem;
