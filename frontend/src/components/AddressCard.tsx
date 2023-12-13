"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "@components/form/Input3";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  editOrAddBillingAddress,
  addShippingAddress,
  editShippingAddress,
} from "@actions/shopServerActions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const schema = z.object({
  name: z.string().optional(),
  isDefault: z.boolean().optional(),
  country: z.string().min(1, { message: "This field is required." }),
  state: z.string().min(1, { message: "This field is required." }),
  city: z.string().min(1, { message: "This field is required." }),
  address1: z.string().min(1, { message: "This field is required." }),
  address2: z.string().optional(),
  houseNumber: z.string().min(1, { message: "This field is required." }),
  postalCode: z.string().min(1, { message: "This field is required." }),
  phoneNumber: z
    .string()
    .min(1, { message: "This field is required." })
    .min(8, { message: "Invalide phone." })
    .regex(/^(\+[0-9]+|[0-9]+)$/, { message: "Invalid phone number." }),
});
export type TAddress = z.infer<typeof schema>;

const AddressCard = ({
  address,
  isBA,
  isNew,
  index,
}: {
  address?: TAddress;
  isBA?: boolean;
  isNew?: boolean;
  index?: number;
}) => {
  const router = useRouter();

  const { control, handleSubmit, reset } = useForm<TAddress>({
    defaultValues: {
      name: "",
      country: "",
      state: "",
      city: "",
      address1: "",
      address2: "",
      houseNumber: "",
      postalCode: "",
      phoneNumber: "",
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    reset(address as TAddress);
  }, [address]);

  const submit = async (payload: TAddress) => {
    console.log(payload);
    isNew
      ? await addShippingAddress(payload)
      : isBA
      ? await editOrAddBillingAddress(payload)
      : await editShippingAddress(payload, index as number);
    router.push(`?`);
  };

  return (
    <>
      <h1 className={`text-center text-2xl p-4 py-2 mb-4 border-b`}>
        {address?.name ?? `BILLING ADDRESS`}
      </h1>
      <form
        className={`flex gap-3 flex-col mb-2 `}
        onSubmit={handleSubmit(submit)}
      >
        {!isBA && (
          <Input
            label
            name={"name"}
            control={control}
          />
        )}
        <Input
          label
          name={"country"}
          control={control}
        />
        <Input
          label
          name={"state"}
          control={control}
        />
        <Input
          label
          name={"city"}
          control={control}
        />
        <Input
          label
          name={"address1"}
          control={control}
        />
        <Input
          label
          name={"address2"}
          control={control}
        />
        <Input
          label
          name={"houseNumber"}
          control={control}
        />
        <Input
          label
          name={"postalCode"}
          control={control}
        />
        <Input
          label
          name={"phoneNumber"}
          control={control}
        />
        <button
          type="submit"
          className={`btn2 rounded my-4 py-1`}
        >
          Submit
        </button>
      </form>
    </>
  );
};

AddressCard.propTypes = {};

export default AddressCard;
