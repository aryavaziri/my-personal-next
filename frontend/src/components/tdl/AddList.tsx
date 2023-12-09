"use client";
import { useForm } from "react-hook-form";
import { type TList } from "@components/tdl/List";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addListAction } from "@actions/TDLserverActions";

const schema = z.object({
  title: z.string().max(12),
});

const AddList = () => {
  const { register, handleSubmit, reset } = useForm<TList>({
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(schema),
  });

  const addList = async (payload: TList) => {
    await addListAction(payload).then(() => {
      reset();
    });
  };

  return (
    <form
      className="shadow shadow-current gap-2 h-min p-2 justify-between flex w-full"
      onSubmit={handleSubmit(addList)}
    >
      <input
        {...register("title")}
        className={` bg-light/30 grow`}
      />
      <button type="submit">ADD LIST</button>
    </form>
  );
};

export default AddList;
