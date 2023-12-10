"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addProductAction } from "@actions/shopServerActions";
import Input from "@components/form/Input3";
import { useState, useContext } from "react";
import { Context } from "@app/Provider";
export const schema = z.object({
  name: z.string().min(1, "Name is required").max(12),
  description: z.string(),
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
  quantity_in_stock: z.coerce.number(),
  price: z.coerce.number(),
});
export type TProductInput = z.infer<typeof schema>;
const AddProduct = () => {
  const myContext = useContext(Context);
  const [toggle, setToggle] = useState(false);
  const { handleSubmit, reset, control, register, formState } =
    useForm<TProductInput>({
      defaultValues: {
        name: "",
        description: "",
        image: undefined,
        quantity_in_stock: 1,
        price: 0,
      },
      resolver: zodResolver(schema),
    });

  const addProduct = async (payload: TProductInput) => {
    const form = new FormData();
    form.append("imageFile", payload.image);
    form.append("name", payload.name);
    form.append("description", payload.description);
    form.append("price", payload.price.toString());
    form.append("quantity", payload.quantity_in_stock.toString());
    addProductAction(form).then((result) => {
      if (result?.success) {
        reset();
      } else {
        console.log("NOT SUCCESSFUL");
      }
    });
  };

  return myContext.isAuth && toggle ? (
    <form
      className="shadow shadow-current rounded gap-2 h-min p-2 gap-2 flex flex-col w-full"
      encType="multipart/form-data"
      onSubmit={handleSubmit(addProduct)}
    >
      <Input
        name="name"
        control={control}
        label
      />
      <Input
        name="description"
        control={control}
        label
      />
      <Input
        name="quantity_in_stock"
        placeholder="quantity"
        control={control}
        label="quantity"
        type="number"
      />
      <Input
        name="price"
        control={control}
        type="number"
        label="price"
      />
      <input
        {...register("image")}
        type="file"
      />
      {formState.errors?.image && (
        <span className="text-danger text-sm ml-20">
          {formState.errors.image?.message}
        </span>
      )}
      <button
        className={`border my-1 py-1 rounded border-current hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark duration-300`}
        type="submit"
      >
        ADD Product
      </button>
    </form>
  ) : (
    <button
      className={`border my-1 py-1 rounded border-current hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark duration-300 h-min`}
      onClick={() => setToggle(true)}
    >
      ADD PRODUCT
    </button>
  );
};

export default AddProduct;
