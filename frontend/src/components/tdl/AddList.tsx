"use client";
import { useContext, useEffect, useState } from "react";
import { Context } from "@app/Provider";
import { useForm } from "react-hook-form";
import { type TList } from "@components/tdl/List";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getToken } from "@actions/serverActions";

const schema = z.object({
  title: z.string().max(12),
});

const AddList = () => {
  const router = useRouter();
  const myContext = useContext(Context);
  const { register, control, handleSubmit, watch, formState, reset } =
    useForm<TList>({
      defaultValues: {
        title: "",
      },
      resolver: zodResolver(schema),
    });
  const addList = async (payload: TList) => {
    console.log(payload);
    const token = await getToken();

    await fetch("http://localhost:5000/rh/list", {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token ?? "" },
      body: JSON.stringify({
        title: payload.title,
      }),
    }).then(async (response) => {
      console.log(response);
      reset();
      router.refresh();
    });
  };

  return (
    <form
      // className="bg-dark/4"
      onSubmit={handleSubmit(addList)}
    >
      <input {...register("title")} />
      <button type="submit">Create A Shopping List</button>
    </form>
  );
};

export default AddList;
