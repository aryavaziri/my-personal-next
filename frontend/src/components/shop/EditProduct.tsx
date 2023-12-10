"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useContext, useEffect, useRef } from "react";
import { Context } from "@app/Provider";
import { TProduct } from "./Product";
import { LiaImage } from "react-icons/lia";
import { changeProductImageAction } from "@actions/shopServerActions";

export const schema = z.object({
  image: z
    .custom<FileList>()
    .transform((fileList) => fileList?.[0])
    .refine((file) => file, `Image is required.`)
    .refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file?.type
        ),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});
export type TProductImg = z.infer<typeof schema>;

const EditProduct = ({ product }: { product: TProduct }) => {
  const myContext = useContext(Context);
  const hiddenFileInput = useRef<HTMLInputElement>();
  const { handleSubmit, register, formState, watch } = useForm<TProductImg>({
    defaultValues: {
      image: undefined,
    },
    resolver: zodResolver(schema),
  });
  const { ref, ...rest } = register("image");

  // useEffect(() => {
  //   console.log(formState.errors);
  // }, [formState]);

  const changeImg = async (payload: any) => {
    const form = new FormData();
    form.append("imageFile", payload.image);
    form.append("productId", product._id);
    try {
      await changeProductImageAction(form);
    } catch (error) {
      console.log("NOT SUCCESSFUL");
    }
  };
  useEffect(() => {
    handleSubmit(changeImg)();
  }, [watch("image")]);

  return (
    myContext.isAuth && (
      <form>
        <input
          {...rest}
          type="file"
          className="hidden"
          ref={(e) => {
            ref(e);
            e && (hiddenFileInput.current = e);
          }}
        />
        <button
          onClick={async (e) => {
            e.preventDefault();
            hiddenFileInput.current!.click();
          }}
          className="aspect-square rounded-full bg-black/30 text-sky-300/60 hover:bg-slate-300/80 hover:text-sky-600 p-1"
        >
          <LiaImage />
        </button>
      </form>
    )
  );
};

export default EditProduct;
